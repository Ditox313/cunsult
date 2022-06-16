import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInterface } from '../../types/comment.interface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {

canReply: boolean = false;
canEdit: boolean = false;
canDelete: boolean = false;

// id текущего пользователя
@Input() currentUserId!: string;

// Получаем текущий комментарий
@Input() comment!: CommentInterface;


@Input() replies!: CommentInterface[];


ngOnInit(): void{
    // Время когда можно отредактировать комментарий
    const fiveMinutes = 300000;

    // Можно ли отвечать 
    this.canReply = Boolean(this.currentUserId);


    // Проверяем прошло ли время для редактирования комментария
    const timePassed = (Date.now() - new Date(this.comment.date).getTime()) > fiveMinutes;


    console.log("Время",)
      


    // Провепяем, можно ли редактировать комментарий
    this.canEdit = this.currentUserId === this.comment.userId && !timePassed;



    // Проверяем можно ли удалить комментарий(Только в том случаем что на него нет ответов)
    this.canDelete = this.currentUserId === this.comment.userId && this.replies.length === 0 && !timePassed;




    
    

    // this.createdAt = new Date(this.comment.createdAt).toLocaleDateString();

    

    


    // this.replyId = this.parentId ? this.parentId : this.comment.id;
}


}
