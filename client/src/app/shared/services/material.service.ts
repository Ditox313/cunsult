
// // Сервис для работы с materialyze.css

import { ElementRef } from "@angular/core";
import { MaterialInstance } from "../other/interfaces";


// // Декларируем переменную "m" и необходимые свойста и методы, что бы избежать ошибок
declare var M: {
  toast: (arg0: { html: string }) => void;
  updateTextFields: any;
  Modal: any;
  init: (arg0: { html: ElementRef }) => void;
  FormSelect: any;
  textareaAutoResize: any;
};



export class MaterialService
{

    

    
    static toast(message: string)
    {
        // Метод описан в документации js фреймворка materialyze
        M.toast({html: message})
    }




    

    // Обновляем текстовые инпуты
    static updateTextInputs()
    {
        M.updateTextFields();
    }


    // Инициализируем модальное окно
    static initModalPos(ref: ElementRef): MaterialInstance
    {
        return M.Modal.init(ref.nativeElement); 
    }



     // Обновляем текстовые инпуты
    static initTextarea(ref: ElementRef)
    {
        return M.textareaAutoResize(ref.nativeElement);
    }

    
}



