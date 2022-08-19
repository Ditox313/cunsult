import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AdditionalLikeCommentService } from './servises/additional-like-comment.service';
import { AdditionalLikeCommentComponent } from './components/additional-like-comment/additional-like-comment.component';



@NgModule({
  declarations: [AdditionalLikeCommentComponent],
  imports: [
    CommonModule, HttpClientModule, BrowserModule
  ],
  exports: [
    [AdditionalLikeCommentComponent]
  ],
  providers: [AdditionalLikeCommentService],
})
export class AdditionalLikeCommentModule { }
