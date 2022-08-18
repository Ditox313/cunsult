import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LikesCommentService {
  constructor(private httpClient: HttpClient) {}

  addLike(commentId: string, userId: string): Observable<any> {
    const body = {
      commentId: commentId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes-comment`, body);
  }

  removeLike(commentId: string, userId: string): Observable<any> {
    const body = {
      commentId: commentId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes-comment/remove`, body);
  }



  addDisLike(commentId: string, userId: string): Observable<any> {
    const body = {
      commentId: commentId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes-comment/dislike`, body);
  }



  removeDisLike(commentId: string, userId: string): Observable<any> {
    const body = {
      commentId: commentId,
      userId: userId,
    };
    return this.httpClient.post<any>(`/api/likes-comment/remove/disLike`, body);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byId/${id}`);
  }
}
