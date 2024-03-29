import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import* as  Header from '@editorjs/header';
import* as  Marker from '@editorjs/marker';
import* as  SimpleImage  from '@editorjs/simple-image';
import* as  ImageTool   from '@editorjs/image';
import* as Table from '@editorjs/table';
import List from '@editorjs/list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Quote } from '@angular/compiler';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from '../../services/case.service';

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
  cases: Case[] = []//Список всех кейсов
  // Храним файл который будем сохранять на сервер
  xs_preview__file: File
  // Переменная для превью аватарки
  previewSrc : any= ''


  // Получаем input загрузки файлов в профиле
  @ViewChild('input') inputRef : ElementRef;


  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    // Инициализируем форму
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      otraslSpec: new FormControl(null, [Validators.required]),
      functionsNapravlenie: new FormControl(null,[Validators.required]),
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
        otraslSpec: res.otraslSpec,
        functionsNapravlenie: res.functionsNapravlenie,
      })

      if(res.previewSrc)
      {
        this.previewSrc = res.previewSrc
      }


      // Получаем список всех кейсов для удаления
    this.caseServise.fetch().subscribe((cases)=>{
      this.cases = this.cases.concat(cases)
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
      },
      data: res.content,
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
    });


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
      this.previewSrc = reader.result
    }
    reader.readAsDataURL(file)
  }



  // Тригер кнопки загрузки файла
  triggerClick()
  {
    this.inputRef.nativeElement.click();
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





  onSubmit(){
    this.editor
      .save()
      .then((res) => {
        // Формируем объект юзера
        const xscaseUpdate = {
          title: this.form.value.title,
          otraslSpec: this.form.value.otraslSpec,
          functionsNapravlenie: this.form.value.functionsNapravlenie,
          content: res,
          caseId: this.caseId,
        }
        this.editor.clear();
        this.editor.destroy();


        this.caseServise.update(this.caseId, xscaseUpdate, this.xs_preview__file ).subscribe((res)=>{
          this.form.patchValue({ 
            title: res.title, 
            otraslSpec: res.otraslSpec,
            functionsNapravlenie: res.functionsNapravlenie,
          })

          if(res.previewSrc)
          {
            this.previewSrc = res.previewSrc
          }

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
