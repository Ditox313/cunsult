import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdditionalLikeCommentModule } from '../additional-like-comment/additional-like-comment.module';
import { LikesCommentModule } from '../likes-comment/likes-comment.module';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/commentForm/commentForm.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsService } from './services/comments.service';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LikesCommentModule,AdditionalLikeCommentModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  providers: [CommentsService],
  exports: [CommentsComponent],
})
export class CommentsModule {}
