import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';

import { LoginPageComponent } from './global/login-page/login-page.component';
import { RegisterPageComponent } from './global/register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { CasesComponent } from './site/cases/cases.component';
import { FavouritesComponent } from './site/favourites/favourites.component';
import { TapeComponent } from './site/tape/tape.component';
import { MessagesComponent } from './site/messages/messages.component';
import { CaseFormComponent } from './site/case-form/case-form.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
  },

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

  {
    path: 'site',
    component: SiteLayoutComponent,
    children: [
      {
        path: 'cases',
        component: CasesComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
      {
        path: 'tape',
        component: TapeComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'cases/new',
        component: CaseFormComponent,
      },
    ],
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
