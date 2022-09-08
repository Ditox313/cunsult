import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/shared/other/interfaces';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-widget-search',
  templateUrl: './widget-search.component.html',
  styleUrls: ['./widget-search.component.css']
})
export class WidgetSearchComponent implements OnInit {

  // Результат поиска
  searchResult: Case[] = [];

  // Проверяем есть ли введенный запрос
  hasQuery: Boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    
   
  }


  // Получаем данные для поиска
  searchData(e: any)
  {
    // Отчищаем запрос
    let query:string = e.target.value.trim()

    // Если запрос ничего не содержит или содержит только пробелы
    let matchSpaces = query.match(/\s*/);
    if (matchSpaces[0] === query)
    {
      this.searchResult = [];
      this.hasQuery = false;
      return;
    }

    
    this.searchService.searchWidget(query).subscribe(res=>{
      this.searchResult = res;
      this.hasQuery = true;
    })
  }


  closeBody(e: any)
  {
    console.log(e);
    
  }

}
