import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CaseService } from 'src/app/private/cases/services/case.service';
import { User } from 'src/app/shared/other/interfaces';
import { CommentsService } from '../../services/comments.service';
import { ActiveCommentInterface } from '../../types/activeComment.interface';
// import { ActiveCommentInterface } from '../../types/activeComment.interface';
import { CommentInterface } from '../../types/comment.interface';

// Шаг пагинации
const STEP = 20


@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  // Принимаем id текущего кейса из вне
  @Input() caseId: string | undefined;

  @Output() commentsCount: EventEmitter<CommentInterface[]> = new EventEmitter<
    CommentInterface[]
  >();

  // Принимаем  текущего пользователя из вне
  @Input() currentUser: User;

  // Список комменатриев
  comments: CommentInterface[] = [];
  mainComments: CommentInterface[] = [];
  commentsAllPaginate: CommentInterface[] = [];

  // Активный комментарий
  activeComment: ActiveCommentInterface | null = null;

  // Аватар для комментария
  commentAvatar = '';

  // Текущий кейс
  activeCase!: any;

  // Параметры для пагинации
  offset: any = 0;
  limit: any = STEP;
  noMoreComments: Boolean = false;
  loading: Boolean = false;

  constructor(
    private commentsService: CommentsService,
    private auth: AuthService,
    private caseServise: CaseService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Получить текущйи кейс
    this.caseServise.getById(this.caseId).subscribe((xscase) => {
      this.activeCase = xscase;
      this.commentsCount.emit(this.activeCase.commentsCount);
    });

    // Получаем текущего юзера
    this.auth.get_user().subscribe((user) => {
      this.currentUser = user;
      this.commentAvatar = user.xsAvatar;
    });

    // Получаем комментарии на каждом шаге пагинации
    this.fetch();

    // Получаем список комментариев для счетчика пагинации
    this.commentsService.getComments(this.caseId).subscribe((comments) => {
      this.commentsAllPaginate = comments
      //  this.commentsCount.emit(this.commentsAllPaginate)
    });
  }

  // Делаем отдельную функцию для пагинации
  private fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.commentsService
      .getComments(this.caseId, params)
      .subscribe((comments) => {
        this.comments = this.comments.concat(comments);
        this.mainComments = this.mainComments.concat(
          comments.filter((comment) => comment.parentId === null)
        );

        if (comments.length < STEP) {
          this.noMoreComments = true;
        }

        this.loading = false;
      });

  }

  // Добавляем комментарий
  addComment({
    text,
    parentId,
    user,
    caseId,
  }: {
    text: string;
    parentId: string | null;
    user: User;
    caseId: string;
  }): void {
    this.commentsService
      .createComment(text, parentId, user, caseId).pipe(
        map(data => {
          // Получить текущйи кейс
          this.caseServise.getById(this.caseId).subscribe((xscase) => {
            this.activeCase = xscase;
            this.commentsCount.emit(this.activeCase.commentsCount);
          });
          return data;
        })
      )
      .subscribe((newComment) => {
        this.comments = [newComment, ...this.comments];
        this.mainComments = [newComment, ...this.mainComments].filter(
          (comment) => comment.parentId === null
        );
        this.activeComment = null;
      });


  }

  // Обновление комментария
  updateComment({ text }: { text: any; commentId: string }): void {
    this.commentsService
      .updateComment(text.comment, text.text)
      .subscribe((updatedComment) => {
        this.mainComments = this.mainComments.map((comment) => {
          if (comment._id === text.comment) {
            return updatedComment;
          }

          return comment;
        });

        this.comments = this.comments.map((comment) => {
          if (comment._id === text.comment) {
            return updatedComment;
          }

          return comment;
        });

        this.activeComment = null;
      });
  }

  // Получаем ответы
  getReplies(commentId: string): CommentInterface[] {
    const xsRep = this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return xsRep;
  }

  // Устанавливаем активный комментарий
  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  // Удаляем комментарий
  deleteComment(commentId: string, caseId: any): void {
    this.commentsService.deleteComment(commentId, caseId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment._id !== commentId
      );

      this.mainComments = this.mainComments.filter(
        (comment) => comment._id !== commentId
      );

      // Получить текущйи кейс
      this.caseServise.getById(this.caseId).subscribe((xscase) => {
        this.activeCase = xscase;
        this.commentsCount.emit(this.activeCase.commentsCount);
      });
    });
  }

  //Загрузить еще
  loadmore() {
    this.offset += STEP;
    this.fetch();
  }
}
