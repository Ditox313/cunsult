import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import List from '@editorjs/list';
import { CaseService } from 'src/app/shared/services/case.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Case} from '../../shared/other/interfaces'
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.css']
})
export class CaseEditComponent implements OnInit {

editor: any
  form!: FormGroup; //Инициализируем нашу форму
  caseId: string; //Для хранения id кейса
  xsActualCase: Case;//Текущий кейс, который будем редактировать
  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    // Инициализируем форму
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    }); 


    // Достаем паоаметры
    this.rote.params.subscribe((params)=>{
      this.caseId = params['id'];
    });


    
    // Получаем текущий кейс
    this.caseServise.getById(this.caseId).subscribe((res)=>{
      this.xsActualCase = res
      
      this.form.patchValue({ 
        title: res.title, 
      })

    

      // Настройки Editor
    this.editor = new EditorJS( {
      holderId: 'editor-js',
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
        image: SimpleImage,
      },
      data: res.content
    });

      MaterialService.updateTextInputs();
    });


  }





  onSubmit(){
    this.editor
      .save()
      .then((res) => {
        // Формируем объект юзера
        const xscaseUpdate = {
          title: this.form.value.title,
          content: res,
          caseId: this.caseId,
        }
        this.editor.clear();
        this.editor.destroy();

        console.log('Сохраняем', xscaseUpdate);

        this.caseServise.update(this.caseId, xscaseUpdate ).subscribe((res)=>{
          console.log('Обновленный',res); 

          this.form.patchValue({ 
            title: res.title, 
          })

          this.editor = new EditorJS( {
            holderId: 'editor-js',
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
              image: SimpleImage,
            },
            data: res.content
          });

          MaterialService.updateTextInputs();

          MaterialService.toast('Данные успешно обновлены')
          this.router.navigate(['/site/cases'])
          
        });
      })
      .catch((error) => {
        console.log('Ошибка ', error);
      });
    
  }





}
