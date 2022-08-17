import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/other/interfaces';
import { ActiveCommentInterface } from '../../types/activeComment.interface';
import { ActiveCommentTypeEnum } from '../../types/activeCommentType.enum';
import { CommentInterface } from '../../types/comment.interface';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  replyId: string | null = null;


  // Принимаем id текущего кейса из вне
  @Input() caseId: string | undefined;

  // Текущий пользователь
  currentUser!: User | null;

  // Текущий пользователь
  currentUserComment!: User | null;

  // Свойство для перечисления состояний комментария
  activeCommentType = ActiveCommentTypeEnum;

  // id текущего пользователя
  @Input() currentUserId!: string;

  // Получаем активный комментарий
  @Input() activeComment!: ActiveCommentInterface | null;

  // Получаем текущий комментарий
  @Input() comment!: CommentInterface;

  @Input() replies!: CommentInterface[];

  // Получаем id родителя
  @Input() parentId!: string | null;

  // Действия
  @Output() setActiveComment =
    new EventEmitter<ActiveCommentInterface | null>();
  @Output() addComment = new EventEmitter<{
    text: string;
    parentId: string | null;
    user: User;
    caseId: string | undefined;
  }>();
  @Output() updateComment = new EventEmitter<{
    text: string;
    commentId: string;
  }>();
  @Output() deleteComment = new EventEmitter<string>();

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    //Получаем текущего юзера
    this.auth.get_user().subscribe((user) => {
      this.currentUser = user;
    });

    // Получаем пользователя который написал комментарий
    this.auth.getById(this.comment.userId).subscribe((user) => {
      this.currentUserComment = user;
    });

    // Время когда можно отредактировать комментарий
    const fiveMinutes = 300000;

    // Можно ли отвечать
    this.canReply = Boolean(this.currentUserId);

    // Проверяем прошло ли время для редактирования комментария
    const timePassed =
      Date.now() - new Date(this.comment.date).getTime() > fiveMinutes;

    // Провепяем, можно ли редактировать комментарий
    this.canEdit = this.currentUserId === this.comment.userId && !timePassed;

    // Проверяем можно ли удалить комментарий(Только в том случаем что на него нет ответов)
    this.canDelete =
      this.currentUserId === this.comment.userId &&
      this.replies.length === 0 &&
      !timePassed;

    this.replyId = this.parentId ? this.parentId : this.comment._id;
    // this.createdAt = new Date(this.comment.createdAt).toLocaleDateString();
  }



  // Ответ на коммент
  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment._id === this.comment._id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  // Редактирование коммента
  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment._id === this.comment._id &&
      this.activeComment.type === 'editing'
    );
  }
}
