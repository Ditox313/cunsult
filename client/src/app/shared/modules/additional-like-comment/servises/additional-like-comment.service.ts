import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdditionalLikeCommentService {
  constructor(private httpClient: HttpClient) {}

  // Храним комментарии с дополнительным лайком
  actualCaseAdditionalComments: any[] = [];


  addLike(
    commentId: string,
    commentUserId: string,
    commentUserName: string,
    commentUserSecondName: string,
    caseId: string
  ): Observable<any> {
    const body = {
      commentId: commentId,
      commentUserId: commentUserId,
      commentUserName: commentUserName,
      commentUserSecondName: commentUserSecondName,
      caseId: caseId,
    };
    return this.httpClient.post<any>(`/api/additional-like-comment`, body).pipe(
      map(res=>{
        this.actualCaseAdditionalComments.push(res.comment)
        return res;
      })
    )
  }

  removeLike(commentId: string, commentUserId: string): Observable<any> {
    const body = {
      commentId: commentId,
      commentUserId: commentUserId,
    };

    const idxPos = this.actualCaseAdditionalComments.findIndex(p => p._id === commentId);
    this.actualCaseAdditionalComments.splice(idxPos, 1);

    return this.httpClient.post<any>(
      `/api/additional-like-comment/remove`,
      body
    );
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byId/${id}`);
  }


  // Делаем запрос для получения комментариев данного кейса и заносим список в переменную для хранения этих комментариев
  getByIdCase(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byIdCase/${id}`).pipe(
      map(res=>{
        this.actualCaseAdditionalComments = res.filter((item) => item.additionalLike.length> 0)
        return res;
      })
    )
  }
}
