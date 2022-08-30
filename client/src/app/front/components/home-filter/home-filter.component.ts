import { Component, OnInit } from '@angular/core';
['/page', 'page-all-cases'];
@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css'],
})
export class HomeFilterComponent implements OnInit {
  // Массив с ссылками на категории функционального менеджмента
  links: Array<any> = [
    {
      url: '/page/page-all-cases/Стратегическое развитие',
      name: 'Стратегическое развитие',
    },
    {
      url: '/page/page-all-cases/Управление человеческими ресурсами',
      name: 'Управление человеческими ресурсами',
    },
    {
      url: '/page/page-all-cases/Маркетинг',
      name: 'Маркетинг',
    },
    {
      url: '/page/page-all-cases/IT',
      name: 'IT',
    },
    {
      url: '/page/page-all-cases/Производственный',
      name: 'Производственный',
    },
    {
      url: '/page/page-all-cases/Операционный',
      name: 'Операционный',
    },
    {
      url: '/page/page-all-cases/Финансовый',
      name: 'Финансовый',
    },
    {
      url: '/page/page-all-cases/Инвестиционный',
      name: 'Инвестиционный',
    },
    {
      url: '/page/page-all-cases/Инновационный',
      name: 'Инновационный',
    },
    {
      url: '/page/page-all-cases/Управление качеством',
      name: 'Управление качеством',
    },
    {
      url: '/page/page-all-cases/Антикризисное управление',
      name: 'Антикризисное управление',
    },
    {
      url: '/page/page-all-cases/Логистика и управление цепями поставок',
      name: 'Логистика и управление цепями поставок',
    },
    {
      url: '/page/page-all-cases/Внешнеэкономическая деятельность',
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
