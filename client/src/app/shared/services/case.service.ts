import { Observable } from 'rxjs';
import {Case} from './../other/interfaces'
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";



// Даем возможность инжектировать сервисы в класс
@Injectable({
   providedIn: 'root' //Автоматичеки регистриует сервис в главном модуле
})


export class CaseService
{
    constructor(private http: HttpClient){}


    fetch(params: any = {}): Observable<Case []>
    {
       return this.http.get<Case []>('/api/cases', {
          params: new HttpParams({ //Даем возможность передавать параметры для пагинации
             fromObject: params
          })
       });
    }




   //  Получаем категорию по id. Передаем id для бэкэнд роута
   // getById(id: string): Observable<Category>
   // {
   //    return this.http.get<Category>(`api/category/${id}`);
   // }




   // Создаем категорию
   // create(name: string, image?: File): Observable<Category>
   // {
   //    // Формируем объект для отправки на сервер
   //    const fd = new FormData();

   //    // Добавляем в formdata картинку , если она есть
   //    if(image)
   //    {
   //       fd.append('image', image, image.name);
   //    }

   //    // Добавляем в formdata имя категории
   //     fd.append('name', name);



   //    return this.http.post<Category>('/api/category', fd);
   // }





   // Обновляем  категорию
   // update(id:string, name: string, image?: File): Observable<Category>
   // {
   //    // Формируем объект для отправки на сервер
   //    const fd = new FormData();

   //    // Добавляем в formdata картинку , если она есть
   //    if(image)
   //    {
   //       fd.append('image', image, image.name);
   //    }

   //    // Добавляем в formdata имя категории
   //     fd.append('name', name);

       


   //    //  Делаем запрос с передачей id
   //    return this.http.patch<Category>(`/api/category/${id}`, fd);
   // }




   // Удаление категории
   // delete(id: any): Observable<Message>
   // {
   //    return this.http.delete<Message>(`/api/category/${id}`);
   // }
}