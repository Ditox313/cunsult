import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css'],
})
export class HomeFilterComponent implements OnInit {
  // Массив с ссылками на категории функционального менеджмента
  links: Array<any> = [
    {
      url: '/strateg-razvitie',
      name: 'Стратегическое развитие',
    },
    {
      url: '/human-resource-management',
      name: 'Управление человеческими ресурсами',
    },
    {
      url: '/marketing',
      name: 'Маркетинг',
    },
    {
      url: '/it',
      name: 'IT',
    },
    {
      url: '/production',
      name: 'Производственный',
    },
    {
      url: '/operation',
      name: 'Операционный',
    },
    {
      url: '/finansion',
      name: 'Финансовый',
    },
    {
      url: '/investment',
      name: 'Инвестиционный',
    },
    {
      url: '/inovation',
      name: 'Инновационный',
    },
    {
      url: '/quality-management',
      name: 'Управление качеством',
    },
    {
      url: '/crisis-management',
      name: 'Антикризисное управление',
    },
    {
      url: '/logistics-and-supply-chain-management',
      name: 'Логистика и управление цепями поставок',
    },
    {
      url: '/foreign-economic-activity',
      name: 'Внешнеэкономическая деятельность',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
