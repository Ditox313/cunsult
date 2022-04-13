// import { MaterialInstance } from './../interfaces';
// import { ElementRef, OnInit } from '@angular/core';
// // Сервис для работы с materialyze.css


// // Декларируем переменную "m" и необходимые свойста и методы, что бы избежать ошибок
declare var M: {
  toast: (arg0: { html: string }) => void;
  updateTextFields: any;
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


    
}



