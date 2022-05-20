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


   

    create(xscase: any): Observable<Case>
    {
       return this.http.post<Case>('/api/cases/', xscase);
    }



    uploadEditorImage(): Observable<String>
    {
       return this.http.post<String>('/api/cases/upload', {});
    }



   update(id:string, xscase: Case, image?: File): Observable<Case> {

      // const fd = new FormData(); 
      // fd.append('title', xscase.title);
      // fd.append('content', xscase.content);
      // fd.append('caseId', xscase.caseId);


      // if(image)
      // {
      //    fd.append('casePreview', image, image.name);
      // }



      return this.http.patch<Case>(`/api/cases/update/${id}`, xscase);
   }

   

   getById(id: string): Observable<Case>
   {
      return this.http.get<Case>(`api/cases/${id}`);
   }






}