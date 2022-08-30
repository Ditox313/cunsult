import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-all-cases-filter',
  templateUrl: './page-all-cases-filter.component.html',
  styleUrls: ['./page-all-cases-filter.component.css'],
})
export class PageAllCasesFilterComponent implements OnInit {
  // Массив с ссылками на категории функционального менеджмента
  links: Array<any> = [
    {
      name: 'Стратегическое развитие',
    },
    {
      name: 'Управление человеческими ресурсами',
    },
    {
      name: 'Маркетинг',
    },
    {
      name: 'IT',
    },
    {
      name: 'Производственный',
    },
    {
      name: 'Операционный',
    },
    {
      name: 'Финансовый',
    },
    {
      name: 'Инвестиционный',
    },
    {
      name: 'Инновационный',
    },
    {
      name: 'Управление качеством',
    },
    {
      name: 'Антикризисное управление',
    },
    {
      name: 'Логистика и управление цепями поставок',
    },
    {
      name: 'Внешнеэкономическая деятельность',
    },
  ];

  links2: Array<any> = [
    {
      url: '/page/page-all-cases/Промышленность',
      name: 'Промышленность',
    },
    {
      url: '/page/page-all-cases/Банковский сектор',
      name: 'Банковский сектор',
    },
    {
      url: '/page/page-all-cases/Сельское хозяйство',
      name: 'Сельское хозяйство',
    },
    {
      url: '/page/page-all-cases/Транспорт',
      name: 'Транспорт',
    },
    {
      url: '/page/page-all-cases/Образование',
      name: 'Образование',
    },
    {
      url: '/page/page-all-cases/Здравоохранение',
      name: 'Здравоохранение',
    },
    {
      url: '/page/page-all-cases/Социальное обеспечение',
      name: 'Социальное обеспечение',
    },
    {
      url: '/page/page-all-cases/Строительство',
      name: 'Строительство',
    },
    {
      url: '/page/page-all-cases/Связь',
      name: 'Связь',
    },
    {
      url: '/page/page-all-cases/Торговля',
      name: 'Торговля',
    },
    {
      url: '/page/page-all-cases/Общественное питание',
      name: 'Общественное питание',
    },
    {
      url: '/page/page-all-cases/Логистика',
      name: 'Логистика',
    },
    {
      url: '/page/page-all-cases/Наука',
      name: 'Наука',
    },
    {
      url: '/page/page-all-cases/ЖКХ',
      name: 'ЖКХ',
    },
    {
      url: '/page/page-all-cases/Консалтинг',
      name: 'Консалтинг',
    },
    {
      url: '/page/page-all-cases/Некоммерческая деятельность',
      name: 'Некоммерческая деятельность',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
