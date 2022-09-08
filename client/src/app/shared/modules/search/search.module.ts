import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetSearchComponent } from './components/widget-search/widget-search.component';
import { SearchService } from './services/search.service';
import { PageLayoutComponent } from 'src/app/front/components/page-layout/page-layout.component';
import { CaseShowPublicComponent } from 'src/app/front/components/case-show-public/case-show-public.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SearchResultPageComponent } from './components/search-result-page/search-result-page.component';
import { StriphtmlPipe } from '../../pipes/striphtml.pipe';
import { DeleteNbspPipe } from '../../pipes/delete-nbsp.pipe';

const routes = [

  {
    path: 'page',
    component: PageLayoutComponent,
    children: [
      {
        path: 'case-show-public/:id',
        component: CaseShowPublicComponent,
      },
      {
        path: 'search-result-page',
        component: SearchResultPageComponent,
      },
    ],
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
  },
];


@NgModule({
  declarations: [
    WidgetSearchComponent,
    SearchResultPageComponent,
    StriphtmlPipe,
    DeleteNbspPipe
  ],
  exports : [
    WidgetSearchComponent,
    SearchResultPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SearchService],
})
export class SearchModule { }
