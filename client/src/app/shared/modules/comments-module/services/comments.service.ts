import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/shared/other/interfaces';

@Injectable()

export class CommentsService {
  constructor(private httpClient: HttpClient) {}


  
  getComments(caseId: string, params: any = {}): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(`/api/comments/${caseId}`, {
          params: new HttpParams({ //Даем возможность передавать параметры для пагинации
             fromObject: params
          })
       });
  }


  getAll(caseId: string): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(`/api/comments/${caseId}`);
  }

  createComment(text: string,parentId: string | null = null, user: User, caseId: string): Observable<CommentInterface> {
    const fd = {
      body: text,
      username: user.name,
      parentId: parentId,
      caseId: caseId,
      userId: user._id,
    };
      return this.httpClient.post<CommentInterface>('api/comments/',fd);
  }

  updateComment(id: string , text: string): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(`/api/comments/update/${id}`,{body: text}
    );
  }

  deleteComment(id: string, caseId: string): Observable<{}> {
    return this.httpClient.delete(`/api/comments/${id}`);
  }
  
}


