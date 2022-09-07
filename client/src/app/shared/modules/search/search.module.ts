import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetSearchComponent } from './components/widget-search/widget-search.component';
import { SearchService } from './services/search.service';



@NgModule({
  declarations: [
    WidgetSearchComponent
  ],
  exports : [
    WidgetSearchComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [SearchService],
})
export class SearchModule { }
