import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService } from '../../../comments-module/services/comments.service';
import { LikesCommentService } from '../../servises/likes-comment.service';

@Component({
  selector: 'app-add-like-comment',
  templateUrl: './add-like-comment.component.html',
  styleUrls: ['./add-like-comment.component.css']
})
export class AddLikeCommentComponent implements OnInit {

  isLike: boolean = false;
  isDislike: boolean = false
  addLike$: any;
  actualCase: any;
  

  @Input() commentId: string | undefined;
  @Input() userId: string | undefined;

  constructor(private likesCommentService: LikesCommentService, private CommentsServise: CommentsService) {}

  ngOnInit(): void {
    this.likesCommentService.getById(this.commentId).subscribe((res) => {
      this.actualCase = res;

      if (res.likes.find((item) => item.userId === this.userId)) {
        this.isLike = true;
      }

      if (res.disLikes.find((item) => item.userId === this.userId)) {
        this.isDislike = true;
      }
    });
  }



  actionLike() {
    if (!this.isDislike) {
      if (!this.isLike) {
        this.addLike$ = this.likesCommentService
          .addLike(this.commentId, this.userId)
          .subscribe((res) => {
            this.actualCase = res.comment;
          });

        this.isLike = true;
      } else {
        this.likesCommentService
          .removeLike(this.commentId, this.userId)
          .subscribe((res) => {
            this.actualCase = res;
          });
        this.isLike = false;
      }
    }
  }

  actionDisLike() {
    if (!this.isLike) {
      if (!this.isDislike) {
        this.likesCommentService
          .addDisLike(this.commentId, this.userId)
          .subscribe((res) => {
            this.actualCase = res.comment;
          });
        this.isDislike = true;
      } else {
        this.likesCommentService
          .removeDisLike(this.commentId, this.userId)
          .subscribe((res) => {
            this.actualCase = res;
          });
        this.isDislike = false;
      }
    }
  }

}
