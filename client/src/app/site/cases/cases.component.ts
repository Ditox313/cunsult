import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  
  cases$: Observable<Case[]>

  constructor(public caseServise: CaseService) { }

  ngOnInit(): void {
    this.cases$ = this.caseServise.fetch();
  }

}
