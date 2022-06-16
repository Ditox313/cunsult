import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/other/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentsService } from '../../services/comments.service';
// import { ActiveCommentInterface } from '../../types/activeComment.interface';
import { CommentInterface } from '../../types/comment.interface';


@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  // Принимаем id текущего кейса из вне 
  @Input() caseId: string | undefined;

  // Принимаем id текущего пользователя из вне
  @Input() currentUser: User;

  // Список комменатриев
  comments: CommentInterface[] = [];


  // activeComment: ActiveCommentInterface | null = null;



  constructor(private commentsService: CommentsService, private auth: AuthService) {}

  ngOnInit(): void {

    // Получаем текущего юзера
    this.auth.get_user().subscribe((user)=>{this.currentUser = user});
    

    
    // Получаем список комментариев
    this.commentsService.getComments(this.caseId).subscribe((comments) => {
      this.comments = comments;
      console.log(comments);
    });
  }


  // Добавляем комментарий
   addComment({text, parentId, user, caseId}: {text: string; parentId: string | null; user: User, caseId: string}): void {

    console.log("Текущий пользователь", user);
    
    this.commentsService.createComment(text, parentId, user, caseId).subscribe((newComment) => {
        this.comments = [...this.comments, newComment];
        // this.activeComment = null;
      });
  }


}
