import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './global/header/header.component';
import { LoginPageComponent } from './global/login-page/login-page.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './global/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { FooterComponent } from './global/footer/footer.component';
import { CasesComponent } from './site/cases/cases.component';
import { FavouritesComponent } from './site/favourites/favourites.component';
import { TapeComponent } from './site/tape/tape.component';
import { MessagesComponent } from './site/messages/messages.component';
import { LoaderComponent } from './shared/other/loader/loader.component';
import { registerLocaleData } from '@angular/common';
import rulocale from '@angular/common/locales/ru';
import { CaseFormComponent } from './site/case-form/case-form.component';
import { CaseEditComponent } from './site/case-edit/case-edit.component';
import { CaseShowComponent } from './site/case-show/case-show.component';
import { CommentsModule } from './modules/comments-module/comments.module';
import { CaseShowPublicComponent } from './global/case-show-public/case-show-public.component';
import { PageLayoutComponent } from './shared/layouts/page-layout/page-layout.component';
import { HeaderPageComponent } from './global/header-page/header-page.component';
import { HomeCasesListComponent } from './global/home-cases-list/home-cases-list.component';
import { LikesModule } from './modules/likes/likes.module';


registerLocaleData(rulocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    RegisterPageComponent,
    SiteLayoutComponent,
    FooterComponent,
    CasesComponent,
    FavouritesComponent,
    TapeComponent,
    MessagesComponent,
    LoaderComponent,
    CaseFormComponent,
    CaseEditComponent,
    CaseShowComponent,
    CaseShowPublicComponent,
    PageLayoutComponent,
    HeaderPageComponent,
    HomeCasesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommentsModule,
    LikesModule
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
