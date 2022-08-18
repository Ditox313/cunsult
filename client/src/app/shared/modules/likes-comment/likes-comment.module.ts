import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AddLikeCommentComponent } from './components/add-like-comment/add-like-comment.component';
import { LikesCommentService } from './servises/likes-comment.service';



@NgModule({
  declarations: [
    AddLikeCommentComponent
  ],
  imports: [CommonModule, HttpClientModule, BrowserModule],
  exports: [AddLikeCommentComponent],
  providers: [LikesCommentService],
})
export class LikesCommentModule { }
