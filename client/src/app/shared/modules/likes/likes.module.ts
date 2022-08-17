import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLikeComponent } from './components/add-like/add-like.component';
import { LikesService } from './servises/likes.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [AddLikeComponent],
  imports: [CommonModule, HttpClientModule, BrowserModule],
  exports: [AddLikeComponent],
  providers: [LikesService],
})
export class LikesModule {}
