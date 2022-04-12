import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './global/header/header.component';
import { LoginPageComponent } from './global/login-page/login-page.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { HeaderSecondComponent } from './global/header-second/header-second.component';
import { RegisterPageComponent } from './global/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    HeaderSecondComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
