import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import* as Table from '@editorjs/table';
import* as List from '@editorjs/list';
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
      otraslSpec: new FormControl(null, [Validators.required]),
      functionsNapravlenie: new FormControl(null,[Validators.required]),
    }); 



    // Настройки Editor
    this.editor = new EditorJS( {
      holderId: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link', 'bold']
        },
        table: Table,
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
      },
      i18n: {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      /**
       * Other below: translation of different UI components of the editor.js core
       */
      ui: {
        "blockTunes": {
          "toggler": {
            "Click to tune": "Нажмите, чтобы настроить",
            "or drag to move": "или перетащите"
          },
        },
        "inlineToolbar": {
          "converter": {
            "Convert to": "Конвертировать в"
          }
        },
        "toolbar": {
          "toolbox": {
            "Add": "Добавить"
          }
        }
      },
  
      /**
       * Section for translation Tool Names: both block and inline tools
       */
      toolNames: {
        "Text": "Параграф",
        "Heading": "Заголовок",
        "List": "Список",
        "Warning": "Примечание",
        "Checklist": "Чеклист",
        "Quote": "Цитата",
        "Code": "Код",
        "Delimiter": "Разделитель",
        "Raw HTML": "HTML-фрагмент",
        "Table": "Таблица",
        "Link": "Ссылка",
        "Marker": "Маркер",
        "Bold": "Полужирный",
        "Italic": "Курсив",
        "InlineCode": "Моноширинный",
      },
  
      /**
       * Section for passing translations to the external tools classes
       */
      tools: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
         */
        "warning": { // <-- 'Warning' tool will accept this dictionary section
          "Title": "Название",
          "Message": "Сообщение",
        },
  
        /**
         * Link is the internal Inline Tool
         */
        "link": {
          "Add a link": "Вставьте ссылку"
        },
        /**
         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
         */
        "stub": {
          'The block can not be displayed correctly.': 'Блок не может быть отображен'
        }
      },
  
      /**
       * Section allows to translate Block Tunes
       */
      blockTunes: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
         *
         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
         */
        "delete": {
          "Delete": "Удалить"
        },
        "moveUp": {
          "Move up": "Переместить вверх"
        },
        "moveDown": {
          "Move down": "Переместить вниз"
        }
      },
    }
      },
    });


    MaterialService.updateTextInputs();
  }





  onSubmit(){
    this.editor
      .save()
      .then((res) => {
        // Формируем объект юзера
        const xscase = {
          title: this.form.value.title,
          content: res,
          otraslSpec: this.form.value.otraslSpec,
          functionsNapravlenie: this.form.value.functionsNapravlenie,
        } 

        console.log(xscase);
        

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
