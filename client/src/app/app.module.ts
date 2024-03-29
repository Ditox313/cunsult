import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { LoaderComponent } from './shared/other/loader/loader.component';
import { registerLocaleData } from '@angular/common';
import rulocale from '@angular/common/locales/ru';
import { AuthModule } from './auth/auth.module';
import { FrontModule } from './front/front.module';
import { CommentsModule } from './shared/modules/comments-module/comments.module';
import { LikesModule } from './shared/modules/likes/likes.module';
import { CasesModule } from './private/cases/cases.module';
import { LikesCommentModule } from './shared/modules/likes-comment/likes-comment.module';
import { AdditionalLikeCommentModule } from './shared/modules/additional-like-comment/additional-like-comment.module';


registerLocaleData(rulocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommentsModule,
    LikesModule,
    AuthModule,
    FrontModule,
    CasesModule,
    LikesCommentModule,
    AdditionalLikeCommentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
