import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Case } from 'src/app/shared/other/interfaces';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit {
  
  form!: FormGroup; //Инициализируем нашу форму
  editor: any;

  // Результат поиска
  searchResult: any = [];

  // Проверяем есть ли введенный запрос
  hasQuery: Boolean = false;

  constructor(public searchServise: SearchService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      search: new FormControl(null),
    });

    this.form.patchValue({
      search: this.searchServise.query,
    })

    this.hasQuery = true;
  }





  // Получаем данные для поиска
  searchData(e: any) {
    // Отчищаем запрос
    let query: string = e.target.value.trim()

    // Если запрос ничего не содержит или содержит только пробелы
    let matchSpaces = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.searchResult = [];
      this.hasQuery = false;
      return;
    }


    this.searchServise.searchWidget(query).subscribe(res => {
      this.searchResult = res;
      this.hasQuery = true;
    })
  }

}
