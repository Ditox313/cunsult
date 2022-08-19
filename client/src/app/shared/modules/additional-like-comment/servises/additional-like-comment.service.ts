import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdditionalLikeCommentService {
  constructor(private httpClient: HttpClient) {}

  addLike(commentId: string, commentUserId: string): Observable<any> {
    const body = {
      commentId: commentId,
      commentUserId: commentUserId,
    };
    return this.httpClient.post<any>(`/api/additional-like-comment`, body);
  }

  removeLike(commentId: string, commentUserId: string): Observable<any> {
    const body = {
      commentId: commentId,
      commentUserId: commentUserId,
    };
    return this.httpClient.post<any>(`/api/additional-like-comment/remove`, body);
  }


  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byId/${id}`);
  }



  // addDisLike(commentId: string, userId: string): Observable<any> {
  //   const body = {
  //     commentId: commentId,
  //     userId: userId,
  //   };
  //   return this.httpClient.post<any>(`/api/likes-comment/dislike`, body);
  // }



  // removeDisLike(commentId: string, userId: string): Observable<any> {
  //   const body = {
  //     commentId: commentId,
  //     userId: userId,
  //   };
  //   return this.httpClient.post<any>(`/api/likes-comment/remove/disLike`, body);
  // }

  
}
