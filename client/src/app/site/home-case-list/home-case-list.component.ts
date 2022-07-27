import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CaseService } from 'src/app/shared/services/case.service';

@Component({
  selector: 'app-home-case-list',
  templateUrl: './home-case-list.component.html',
  styleUrls: ['./home-case-list.component.css']
})
export class HomeCaseListComponent implements OnInit {
  cases$: Subscription | any;


  constructor(private caseServise: CaseService,private authService: AuthService) { }

  ngOnInit(): void {
    this.cases$ = this.caseServise.get_all_cases().pipe(
        map(
          cases => {
            cases.forEach(xscase => {
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              xscase.previewSrc = xscase.previewSrc.replace('\\', '/');
              
              this.authService.getById(xscase.user).subscribe(data => {
                xscase.userName = data.name
                xscase.userSecondName = data.secondName
                xscase.userProgram = data.program
                xscase.userSpecialization = data.specialization
              })
            });

            return cases
          }
        )
      ).pipe(
        map(cases => {
          // cases.forEach(element => {
          //   console.log(element.commentsCount);
            
          // });
          cases.sort(function(a, b){
            console.log(a.commentsCount - b.commentsCount);
            
              return a.commentsCount - b.commentsCount  ;
          });

          

          return cases.slice(0, 6)
        })
      )
    
  }

}
