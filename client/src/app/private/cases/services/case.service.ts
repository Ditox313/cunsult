import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Case } from 'src/app/shared/other/interfaces';
import { map } from 'rxjs/operators';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class CaseService {
  constructor(private http: HttpClient) {}

  // Переменная для подсчета колличества проектов
  xscases: Case[] = [];

  fetch(params: any = {}): Observable<Case[]> {
    return this.http.get<Case[]>('/api/cases', {
      params: new HttpParams({
        //Даем возможность передавать параметры для пагинации
        fromObject: params,
      }),
    });
  }

  get_all_cases(params: any = {}): Observable<Case[]> {
    return this.http.get<Case[]>('/api/cases/all', {
      params: new HttpParams({
        //Даем возможность передавать параметры для пагинации
        fromObject: params,
      }),
    });
  }

  get_all_cases_by_id(userId: string): Observable<Case[]> {
    return this.http.get<Case[]>(`/api/cases/all/${userId}`).pipe(
      map((res) => {
        this.xscases = res;
        return res;
      })
    );
  }

  create(xscase: any, image?: File): Observable<Case> {
    const fd = new FormData();
    fd.append('title', xscase.title);
    fd.append('content', JSON.stringify(xscase.content));
    fd.append('otraslSpec', xscase.otraslSpec);
    fd.append('functionsNapravlenie', xscase.functionsNapravlenie);

    if (image) {
      fd.append('previewSrc', image, image.name);
    }

    return this.http.post<Case>('/api/cases/', fd).pipe(
      map((res) => {
        this.xscases.push(res);
        return res;
      })
    );
  }

  uploadEditorImage(): Observable<String> {
    return this.http.post<String>('/api/cases/upload', {});
  }

  update(id: string, xscase: Case, image?: File): Observable<Case> {
    const fd = new FormData();
    fd.append('title', xscase.title);
    fd.append('otraslSpec', xscase.otraslSpec);
    fd.append('functionsNapravlenie', xscase.functionsNapravlenie);
    fd.append('content', JSON.stringify(xscase.content));
    fd.append('caseId', xscase.caseId);

    if (image) {
      fd.append('previewSrc', image, image.name);
    }

    return this.http.patch<Case>(`/api/cases/update/${id}`, fd);
  }

  getById(id: string): Observable<Case> {
    return this.http.get<Case>(`api/cases/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`/api/cases/${id}`).pipe(
      map((res) => {
        const idxPos = this.xscases.findIndex(
          (p) => p._id === res.caseIdFromRemove
        );
        this.xscases.splice(idxPos, 1);
        return res;
      })
    );
  }

  // Добавляем 1 к колличеству просмотров
  addShowCase(id) {
    const obj = {
      caseId: id,
    };

    return this.http.patch<any>(`/api/cases/addView/${id}`, obj);
  }
}