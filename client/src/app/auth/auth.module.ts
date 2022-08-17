import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthService } from './services/auth.service';

const routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', // Устанавливаем дефолтный роут, когда попадаем на страницу layout.
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [AuthLayoutComponent, LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [AuthService],
})
export class AuthModule { }
