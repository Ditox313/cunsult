import {
  Component,
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
const STEP = 6

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
  noMoreCases: Boolean = false;
  xsSub: Subscription;

  ngOnInit(): void {
    this.loading = true;
    this.fetch();
  }

  // Получаем все кейсы
  private fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.xsSub = this.caseServise
      .get_all_cases(params)
      .pipe(
        map((cases) => {
          cases.forEach((xscase) => {
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
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

  loadmore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }
}
