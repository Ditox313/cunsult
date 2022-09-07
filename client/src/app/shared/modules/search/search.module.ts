import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetSearchComponent } from './components/widget-search/widget-search.component';
import { SearchService } from './services/search.service';
import { PageLayoutComponent } from 'src/app/front/components/page-layout/page-layout.component';
import { CaseShowPublicComponent } from 'src/app/front/components/case-show-public/case-show-public.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RouterModule } from '@angular/router';

const routes = [

  {
    path: 'page',
    component: PageLayoutComponent,
    children: [
      {
        path: 'case-show-public/:id',
        component: CaseShowPublicComponent,
      },
 
    ],
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
  },
];


@NgModule({
  declarations: [
    WidgetSearchComponent
  ],
  exports : [
    WidgetSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [SearchService],
})
export class SearchModule { }
