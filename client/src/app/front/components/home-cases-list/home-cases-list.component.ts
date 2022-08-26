import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CaseService } from 'src/app/private/cases/services/case.service';

@Component({
  selector: 'app-home-cases-list',
  templateUrl: './home-cases-list.component.html',
  styleUrls: ['./home-cases-list.component.css'],
})
export class HomeCasesListComponent implements OnInit {
  cases$: Subscription | any;
  loading: Boolean = false;

  constructor(
    private caseServise: CaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.cases$ = this.caseServise
      .get_all_cases()
      .pipe(
        map((cases) => {
          cases.forEach((xscase) => {
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
            xscase.previewSrc = xscase.previewSrc.replace('\\', '/');

            this.authService.getById(xscase.user).subscribe((data) => {
              xscase.userName = data.name;
              xscase.userSecondName = data.secondName;
              xscase.userProgram = data.program;
              xscase.userSpecialization = data.specialization;
            });
          });

          return cases;
        })
      )
      .pipe(
        map((cases) => {
          // cases.forEach(element => {
          //   console.log(element.commentsCount);

          // });
          cases.sort(function (a, b) {
            return b.commentsCount - a.commentsCount;
          });

          return cases.slice(0, 6);
        })
      );
      this.loading = false;
      
  }
  
}
