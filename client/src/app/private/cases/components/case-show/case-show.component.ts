import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import* as Table from '@editorjs/table';
import List from '@editorjs/list';
import { Case, User } from 'src/app/shared/other/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentInterface } from 'src/app/shared/modules/comments-module/types/comment.interface';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-show',
  templateUrl: './case-show.component.html',
  styleUrls: ['./case-show.component.css']
})
export class CaseShowComponent implements OnInit {
  currentUser: any
  caseId: string; //Для хранения id кейса
  xsActualCase: Case; //Текущий кейс, который будем редактировать
  cases: Case[] = []//Список всех кейсов
  caseOrder : any; //Глобальный порядковый номер
  caseTitle: string //Заголовок кейса
  caseDate: any //Дата создания 
  previewSrc : any= '';  // Переменная для превью аватарки
  orderViews: any //Колличество просмотров
  editor: any;
  comments_counts: CommentInterface[] = [];



  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router, private auth: AuthService ) { }

  ngOnInit(): void {

    // Получаем текущего юзера
    this.auth.get_user().subscribe((user)=>{
      this.currentUser = user
    });
    

    // Достаем параметры
    this.rote.params.subscribe((params)=>{
      this.caseId = params['id'];
    });


    
    // Делаем сброс комментариев
    this.caseServise.resetNewCommentsCount(this.caseId).subscribe()

    // Прибавляем просмотр
    this.caseServise.addShowCase(this.caseId).subscribe((res)=>{});


    // Получаем текущий кейс
    this.caseServise.getById(this.caseId).subscribe((res)=>{
      this.xsActualCase = res

      
      
      if(res.previewSrc)
      {
        this.previewSrc = res.previewSrc
      }

      this.caseOrder = res.order
      this.caseTitle = res.title
      this.caseDate = res.date
      this.orderViews = res.orderViews

    // Настройки Editor
    this.editor = new EditorJS( {
      holderId: 'editor-js',
      readOnly: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link', 'bold']
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        table: Table,
        image: SimpleImage,
      },
      data: res.content
    });
    });


    // Получаем список всех кейсов для удаления
    this.caseServise.fetch().subscribe((cases)=>{
      this.cases = this.cases.concat(cases)
    });
    
    MaterialService.updateTextInputs();
  }


  // Удалить позицию
  onDeleteCase(event: Event, xscase): void
  {
    event.stopPropagation();


    const dicision = window.confirm(`Удалить кейс?`);

    if (dicision) {
      this.caseServise.delete(xscase._id).subscribe(res => {
        const idxPos = this.cases.findIndex(p => p._id === xscase._id);
        this.cases.splice(idxPos, 1);
        MaterialService.toast(res.message)
        this.router.navigate(['/site/cases'])
      }, error => {
        MaterialService.toast(error.error.message);
      })
    }
  }


  // Получаем коментарии из модуля комментариев
  comments_count(e)
  {
    this.comments_counts = e
  }

}
