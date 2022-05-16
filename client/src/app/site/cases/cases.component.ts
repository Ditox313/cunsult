import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  

  loading: boolean = false
  cases: Case[] = []

  constructor(public caseServise: CaseService) { }

  ngOnInit(): void {
    this.loading = true
    this.caseServise.fetch().subscribe((cases)=>{
      this.loading = false
      this.cases = cases
      console.log(cases);
    });
  }

}
