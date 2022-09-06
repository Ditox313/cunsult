import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserProfile } from 'src/app/shared/other/interfaces';

@Injectable()
export class AdditionalLikeCommentService {
  constructor(
    private httpClient: HttpClient,
    public authService: AuthService
  ) {}
  // Для подписки на эти переменные лучше подписываться на прямую через сервис в html
  // Храним комментарии с дополнительным лайком
  actualCaseAdditionalComments: any[] = [];
  actualCaseCommentsResult: any = {};


  // Храним колличество дополнительных лайков для юзера
  actualAdditionalLikesCount: any = 0;

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
      map((res) => {
        this.actualCaseAdditionalComments.push(res.comment); 
        this.actualAdditionalLikesCount = res.actualUserAdditionalLikesNumber;
        this.exstractAdditionalCommentNameAndLastname()
        return res;
      })
    );
  }

  removeLike(commentId: string, commentUserId: string): Observable<any> {
    const body = {
      commentId: commentId,
      commentUserId: commentUserId,
    };

    const idxPos = this.actualCaseAdditionalComments.findIndex(
      (p) => p._id === commentId
    );
    this.actualCaseAdditionalComments.splice(idxPos, 1);

    return this.httpClient
      .post<any>(`/api/additional-like-comment/remove`, body)
      .pipe(
        map((res) => {
          this.actualAdditionalLikesCount = res.actualUserAdditionalLikesNumber;
          this.exstractAdditionalCommentNameAndLastname()
          return res;
        })
      );
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byId/${id}`);
  }

  // Делаем запрос для получения комментариев данного кейса и заносим список в переменную для хранения этих комментариев
  getByIdCase(id: string): Observable<any> {
    return this.httpClient.get<any>(`api/comments/byIdCase/${id}`).pipe(
      map((res) => {
        this.actualCaseAdditionalComments = res.filter(
          (item) => item.additionalLike.length > 0
        );
        this.exstractAdditionalCommentNameAndLastname()
        return res;
      })
    );
  }

  // Делаем запрос на сервер, получаем  ответ типа User
  get_user(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>('/api/auth/user').pipe(
      map(res=>{
        this.actualAdditionalLikesCount = res.additionalCommentsCount;
        return res;
      })
    )
  }


  // Извлекаем имена людей которым сказали отдельное спасибо и считаем колличество повторений и сохраняем все это в объект
  exstractAdditionalCommentNameAndLastname()
  {
    const newArr = [];
    const arr = this.actualCaseAdditionalComments.forEach(comment => {
      newArr.push(comment.username + ' ' + comment.userSecondName)
    });

    const result = newArr.reduce((acc, rec, index) => {
      return (typeof acc[rec] !== 'undefined')
        ? { ...acc, [rec]: acc[rec] + 1 }
        : { ...acc, [rec]: 1 }
    }, {})

    this.actualCaseCommentsResult = result;
  }
}
