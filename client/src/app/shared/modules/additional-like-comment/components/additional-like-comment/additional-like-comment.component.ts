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
  

  @Input() commentId: string | undefined;
  @Input() commentUserId: string | undefined;
  @Input() currentUserId: string | undefined;
  @Input() caseId: string | undefined;
  

  constructor(private additionlLikeCommentService: AdditionalLikeCommentService, private CommentsServise: CommentsService, private caseServise: CaseService) {}

  ngOnInit(): void {
  
    this.additionlLikeCommentService.getById(this.commentId).subscribe((res) => {
      this.actualComment = res;
      if (res.additionalLike.find((item) => item.commentUserId === this.commentUserId)) {
        this.isLike = true;
      }
    });


    this.caseServise.getById(this.caseId).subscribe(res=>{
      this.actualCase = res;
      // console.log('444',this.caseId);
      // console.log('555',this.currentUserId);
    })


  }



  actionLike() {
    if(this.currentUserId === this.actualCase.user)
    {
      if (!this.isLike) {
        this.addLike$ = this.additionlLikeCommentService
          .addLike(this.commentId, this.commentUserId)
          .subscribe((res) => {
            this.actualComment = res.comment;
          });

        this.isLike = true;
      } else {
        this.additionlLikeCommentService
          .removeLike(this.commentId, this.commentUserId)
          .subscribe((res) => {
            this.actualComment = res;
          });
        this.isLike = false;
      }
      }
    }

  // actionDisLike() {
  //   if (!this.isLike) {
  //     if (!this.isDislike) {
  //       this.additionlLikeCommentService
  //         .addDisLike(this.commentId, this.userId)
  //         .subscribe((res) => {
  //           this.actualCase = res.comment;
  //         });
  //       this.isDislike = true;
  //     } else {
  //       this.additionlLikeCommentService
  //         .removeDisLike(this.commentId, this.userId)
  //         .subscribe((res) => {
  //           this.actualCase = res;
  //         });
  //       this.isDislike = false;
  //     }
  //   }
  // }

}
