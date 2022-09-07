import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { SiteLayoutComponent } from './components/site-layout/site-layout.component';
import { CasesComponent } from './components/cases/cases.component';
import { CaseFormComponent } from './components/case-form/case-form.component';
import { CaseEditComponent } from './components/case-edit/case-edit.component';
import { CaseShowComponent } from './components/case-show/case-show.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { CommentsModule } from 'src/app/shared/modules/comments-module/comments.module';
import { LikesModule } from 'src/app/shared/modules/likes/likes.module';
import { CaseService } from './services/case.service';
import { FrontModule } from 'src/app/front/front.module';
import { AdditionalLikeCommentModule } from 'src/app/shared/modules/additional-like-comment/additional-like-comment.module';
import { SearchModule } from 'src/app/shared/modules/search/search.module';

const routes = [
  {
    path: 'site',
    component: SiteLayoutComponent,
    children: [
      {
        path: 'cases',
        component: CasesComponent,
      },
      
      {
        path: 'cases/new',
        component: CaseFormComponent,
      },
      {
        path: 'cases/edit/:id',
        component: CaseEditComponent,
      },
      {
        path: 'cases/show/:id',
        component: CaseShowComponent,
      },
    ],
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
  },
  

];



@NgModule({
  declarations: [SiteLayoutComponent,CasesComponent,CaseFormComponent, CaseEditComponent, CaseShowComponent],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommentsModule,
    LikesModule,
    FrontModule,
    AdditionalLikeCommentModule,
    SearchModule
  ],
  providers: [CaseService],
})
export class CasesModule { }
