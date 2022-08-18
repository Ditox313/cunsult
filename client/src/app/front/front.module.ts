import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { HomeCasesListComponent } from './components/home-cases-list/home-cases-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CaseShowPublicComponent } from './components/case-show-public/case-show-public.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { CommentsModule } from '../shared/modules/comments-module/comments.module';
import { LikesModule } from '../shared/modules/likes/likes.module';


const routes = [
  {
    path: 'home', component: HomeLayoutComponent,
  },

  {
    path: 'page',
    component: PageLayoutComponent,
    children: [
      {
        path: 'case-show-pablic/:id',
        component: CaseShowPublicComponent,
      },
    ],
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
  },
  

];


@NgModule({
  declarations: [FooterComponent, HeaderComponent, HeaderPageComponent, HomeLayoutComponent, HomeCasesListComponent,PageLayoutComponent,CaseShowPublicComponent],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommentsModule,
    LikesModule,
  ],
  exports: [FooterComponent, HeaderComponent, HeaderPageComponent, HomeLayoutComponent, HomeCasesListComponent, RouterModule,PageLayoutComponent,CaseShowPublicComponent]
})
export class FrontModule { }