import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseService } from 'src/app/private/cases/services/case.service';
import { CommentsService } from '../../../comments-module/services/comments.service';
import { AdditionalLikeCommentService } from '../../servises/additional-like-comment.service';

@Component({
  selector: 'app-additional-like-comment-component',
  templateUrl: './additional-like-comment.component.html',
  styleUrls: ['./additional-like-comment.component.css']
})
export class AdditionalLikeCommentComponent implements OnInit {

  isLike: boolean = false;
  addLike$: any;
  actualComment: any;
  actualCase: any;
  
  

  @Input() comment: any | undefined;
  @Input() commentUserId: string | undefined;
  @Input() currentUser: any | undefined;
  @Input() caseId: string | undefined;
  

  constructor(private additionlLikeCommentService: AdditionalLikeCommentService, private CommentsServise: CommentsService, private caseServise: CaseService) {}

  ngOnInit(): void {
  
    this.additionlLikeCommentService.getById(this.comment._id).subscribe((res) => {
      this.actualComment = res;
      if (res.additionalLike.find((item) => item.commentUserId === this.commentUserId)) {
        this.isLike = true;
      }
    });


    this.caseServise.getById(this.caseId).subscribe(res=>{
      this.actualCase = res;
    })

  }



  actionLike() {
    if(this.currentUser._id === this.actualCase.user)
    {
      if (!this.isLike) {
        this.addLike$ = this.additionlLikeCommentService
          .addLike(
            this.comment._id,
            this.commentUserId,
            this.comment.username,
            this.comment.userSecondName,
            this.caseId
          )
          .subscribe((res) => {
            this.actualComment = res.comment;
          });

        this.isLike = true;
      } else {
        this.additionlLikeCommentService
          .removeLike(this.comment._id, this.commentUserId)
          .subscribe((res) => {
            this.actualComment = res;
          });
        this.isLike = false;
      }
      }
    }

}
