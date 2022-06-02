import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import List from '@editorjs/list';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-case-show',
  templateUrl: './case-show.component.html',
  styleUrls: ['./case-show.component.css']
})
export class CaseShowComponent implements OnInit {
  caseId: string; //Для хранения id кейса
  xsActualCase: Case; //Текущий кейс, который будем редактировать
  
  caseOrder : any; //Глобальный порядковый номер
  caseTitle: string //Заголовок кейса
  caseDate: any //Дата создания 
  previewSrc : any= '';  // Переменная для превью аватарки
  orderViews: any //Колличество просмотров
  editor: any;



  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    

    // Достаем параметры
    this.rote.params.subscribe((params)=>{
      this.caseId = params['id'];
    });

    // Прибавляем просмотр
    this.caseServise.addShowCase(this.caseId).subscribe((res)=>{
      console.log(res);
    });


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
      tools: {
        // header: {
        //   class: Header,
        //   inlineToolbar: ['link', 'bold']
        // },
        // list: {
        //   class: List,
        //   inlineToolbar: true,
        //   config: {
        //     defaultStyle: 'unordered'
        //   }
        // },
        // marker: {
        //   class: Marker,
        //   shortcut: 'CMD+SHIFT+M'
        // },
        image: SimpleImage,
      },
      data: res.content
    });

    console.log(res);
    

    });
    MaterialService.updateTextInputs();
  }

}
