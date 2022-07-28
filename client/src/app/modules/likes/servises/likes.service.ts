import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LikesService {
  constructor(private httpClient: HttpClient) {}

  addLike(caseId: string, userId: string): Observable<any> {
    const body = {
      caseId: caseId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes/`, body);
  }

  addDisLike(caseId: string, userId: string): Observable<any> {
    const body = {
      caseId: caseId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes/dislike`, body);
  }

  removeLike(caseId: string, userId: string): Observable<any> {
    const body = {
      caseId: caseId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes/remove`, body);
  }

  removeDisLike(caseId: string, userId: string): Observable<any> {
    const body = {
      caseId: caseId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes/remove/disLike`, body);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/cases/${id}`);
  }
}
