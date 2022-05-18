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




}