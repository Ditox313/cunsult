import {
  Component,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Case } from 'src/app/shared/other/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CommentsService } from 'src/app/shared/modules/comments-module/services/comments.service';
import { CaseService } from 'src/app/private/cases/services/case.service';
import { AuthService } from 'src/app/auth/services/auth.service';

// Шаг пагинации
const STEP = 3

@Component({
  selector: 'app-page-all-cases',
  templateUrl: './page-all-cases.component.html',
  styleUrls: ['./page-all-cases.component.css'],
})
export class PageAllCasesComponent implements OnInit {
  constructor(
    public caseServise: CaseService,
    private rote: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private auth: AuthService
  ) {}

  cases: Case[] = [];
  loading: Boolean = false;
  offset: any = 0;
  limit: any = STEP;
  offsetFilter: any = 0;
  noMoreCases: Boolean = false;
  noMoreCasesFilter: Boolean = false;
  xsSub: Subscription;
  categorytId: string | undefined;

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
      name: 'Промышленность',
    },
    {
      name: 'Банковский сектор',
    },
    {
      name: 'Сельское хозяйство',
    },
    {
      name: 'Транспорт',
    },
    {
      name: 'Образование',
    },
    {
      name: 'Здравоохранение',
    },
    {
      name: 'Социальное обеспечение',
    },
    {
      name: 'Строительство',
    },
    {
      name: 'Связь',
    },
    {
      name: 'Торговля',
    },
    {
      name: 'Общественное питание',
    },
    {
      name: 'Логистика',
    },
    {
      name: 'Наука',
    },
    {
      name: 'ЖКХ',
    },
    {
      name: 'Консалтинг',
    },
    {
      name: 'Некоммерческая деятельность',
    },
  ];

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params) => {
      if (params['id']) {
        this.categorytId = params['id'];
      }
    });

    this.loading = true;
    this.fetch();
  }

  private fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    if (this.categorytId) {
      this.xsSub = this.caseServise
        .get_by_cat_id(this.categorytId, params)
        .pipe(
          map((cases) => {
            cases.forEach((xscase) => {
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

              this.auth.getById(xscase.user).subscribe((data) => {
                xscase.userName = data.name;
                xscase.userSecondName = data.secondName;
                xscase.userProgram = data.program;
                xscase.userSpecialization = data.specialization;
              });
            });

            return cases;
          })
        )
        .subscribe((cases) => {
          if (cases.length < STEP) {
            this.noMoreCases = true;
          }

          this.loading = false;
          this.cases = this.cases.concat(cases);
        });
    } else {
      this.xsSub = this.caseServise
        .get_all_cases(params)
        .pipe(
          map((cases) => {
            cases.forEach((xscase) => {
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

              this.auth.getById(xscase.user).subscribe((data) => {
                xscase.userName = data.name;
                xscase.userSecondName = data.secondName;
                xscase.userProgram = data.program;
                xscase.userSpecialization = data.specialization;
              });
            });

            return cases;
          })
        )
        .subscribe((cases) => {
          if (cases.length < STEP) {
            this.noMoreCases = true;
          }

          this.loading = false;
          this.cases = this.cases.concat(cases);
        });
    }
  }

  loadmore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  loadmoreFilter() {
    this.loading = true;

    const params = {
      offset: (this.offset += STEP),
      limit: this.limit,
    };

    if (this.categorytId) {
      this.caseServise
        .get_by_cat_id(this.categorytId, params)
        .pipe(
          map((cases) => {
            cases.forEach((xscase) => {
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

              this.auth.getById(xscase.user).subscribe((data) => {
                xscase.userName = data.name;
                xscase.userSecondName = data.secondName;
                xscase.userProgram = data.program;
                xscase.userSpecialization = data.specialization;
              });
            });

            return cases;
          })
        )
        .subscribe((cases) => {

          if (cases.length < STEP) {
            this.noMoreCasesFilter = true;
          }

          this.loading = false;
          this.cases = this.cases.concat(cases);
        });
    }
  }

  filter(id) {
    this.categorytId = id;
    this.noMoreCasesFilter = false;

    const params = {
      offset: (this.offset = 0),
      limit: this.limit,
    };

    if (this.categorytId) {
      this.caseServise
        .get_by_cat_id(this.categorytId, params)
        .pipe(
          map((cases) => {
            cases.forEach((xscase) => {
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

              this.auth.getById(xscase.user).subscribe((data) => {
                xscase.userName = data.name;
                xscase.userSecondName = data.secondName;
                xscase.userProgram = data.program;
                xscase.userSpecialization = data.specialization;
              });
            });

            return cases;
          })
        )
        .subscribe((cases) => {

          if (cases.length < STEP) {
            this.noMoreCasesFilter = true;
          }

          this.loading = false;
          this.cases = cases;
        });
    }
  }

  click_all()
  {
    this.noMoreCases = false;
    this.categorytId = '';
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset = 0,
      limit: this.limit,
    };

    this.xsSub = this.caseServise
      .get_all_cases(params)
      .pipe(
        map((cases) => {
          cases.forEach((xscase) => {
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

            this.auth.getById(xscase.user).subscribe((data) => {
              xscase.userName = data.name;
              xscase.userSecondName = data.secondName;
              xscase.userProgram = data.program;
              xscase.userSpecialization = data.specialization;
            });
          });

          return cases;
        })
      )
      .subscribe((cases) => {
        if (cases.length < STEP) {
          this.noMoreCases = true;
        }

        this.loading = false;
        this.cases = cases;
      });
  }
}
