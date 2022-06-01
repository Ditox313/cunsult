import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import List from '@editorjs/list';
import { CaseService } from 'src/app/shared/services/case.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Case} from '../../shared/other/interfaces'
import { MaterialService } from 'src/app/shared/services/material.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})



export class CaseFormComponent implements OnInit {
  editor: any
  form!: FormGroup; 

  // Получаем input загрузки файлов в профиле
  @ViewChild('input') inputRef : ElementRef;

  // Храним файл который будем сохранять на сервер
  xs_preview__file: File
  // Переменная для превью аватарки
  avatarPreview : any= ''
  


  constructor(public caseServise: CaseService, private router: Router ) { }

  ngOnInit(): void {
    // Инициализируем форму
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    }); 



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
        // image: {
        //   class: ImageTool,
        //   config: {
        //     endpoints: {
        //       byFile: 'http://localhost:5000/api/cases/upload ', // Your backend file uploader endpoint
        //     }
        //   }
        // }
        // image: {
        //   class: ImageTool,
        //   config: {
        //     uploader: {
        //        async uploadByFile(file) {
        //          return fetch('http://localhost:5000/api/cases/upload', {
        //           mode: 'no-cors',
        //           method: 'POST',
        //           headers: {
        //             'Access-Control-Allow-Origin': '*',
        //           },
        //           body: JSON.stringify({
        //             // your expected POST request payload goes here
        //               title: "My post title",
        //               body: "My post content."
        //               })
        //         })
        //           .then(data => {
        //           // enter you logic when the fetch is successful
        //             console.log(data)
        //           })
        //           .catch(error => {
        //           // enter your logic for when there is an error (ex. error toast)
        //           console.log(error)
        //           })  
        //        }
        //     }
        //   }
        // }
      }
    });
  }





  onSubmit(){
    this.editor
      .save()
      .then((res) => {
        // Формируем объект юзера
        const xscase = {
          title: this.form.value.title,
          content: res,
        } 

        this.caseServise.create(xscase, this.xs_preview__file).subscribe((res)=>{
          MaterialService.toast('Кейс успешно создан')
          this.router.navigate(['/site/cases'])
        })

      })
      .catch((error) => {
        console.log('Ошибка ', error);
      });

    
  }






  // Тригер кнопки загрузки файла
  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }


  //Обрабатываем загрузку аватарки
  onPreviewFileUpload(event: any)
  {
    const file = event.target.files[0]

    
    // Сохраняем выбранный файл
    this.xs_preview__file = file

    const reader = new FileReader()

    // Когда загрузится картинка
    reader.onload = () => {
      this.avatarPreview = reader.result
    }
    reader.readAsDataURL(file)
  }




}
