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


   

    create(xscase: any, image?: File): Observable<Case>
    {
      const fd = new FormData(); 
      fd.append('title', xscase.title);
      fd.append('content',  JSON.stringify(xscase.content) );
      fd.append('otraslSpec', xscase.otraslSpec);
      fd.append('functionsNapravlenie', xscase.functionsNapravlenie);

      
      if(image)
      {
         fd.append('previewSrc', image, image.name);
      }



      return this.http.post<Case>('/api/cases/', fd);
    }




    uploadEditorImage(): Observable<String>
    {
       return this.http.post<String>('/api/cases/upload', {});
    }



   update(id:string, xscase: Case, image?: File): Observable<Case> {

      const fd = new FormData(); 
      fd.append('title', xscase.title);
      fd.append('otraslSpec', xscase.otraslSpec);
      fd.append('functionsNapravlenie', xscase.functionsNapravlenie);
      fd.append('content',  JSON.stringify(xscase.content) );
      fd.append('caseId', xscase.caseId);

      
      if(image)
      {
         fd.append('previewSrc', image, image.name);
      }

      



      return this.http.patch<Case>(`/api/cases/update/${id}`, fd);
   }

   

   getById(id: string): Observable<Case>
   {
      return this.http.get<Case>(`api/cases/${id}`);
   }






    // Удаление категории
   delete(id: any): Observable<any>
   {
      return this.http.delete<any>(`/api/cases/${id}`);
   }



   // Добавляем 1 к колличеству просмотров
   addShowCase( id)
   {
      const obj = {
         caseId: id
      }
      
      return this.http.patch<any>(`/api/cases/addView/${id}`, obj);
   }






}