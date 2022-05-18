import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';

// Шаг пагинации
const STEP = 3

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit, OnDestroy {

  loading: Boolean = false
  cases: Case[] = []
  offset: any = 0
  limit: any = STEP
  xsSub: Subscription
  noMoreCases: Boolean = false

  constructor(public caseServise: CaseService) { }

  ngOnInit(): void {
    this.loading = true
    this.fetch()
  }

  ngOnDestroy(): void {
    this.xsSub.unsubscribe()
  }

  // Получаем все кейсы
  private fetch()
  {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit
    }

    this.xsSub = this.caseServise.fetch(params).subscribe((cases)=>{
      if(cases.length < STEP)
      {
        this.noMoreCases = true
      }
       
      this.loading = false
      this.cases = this.cases.concat(cases)
      console.log(this.cases);
      
    });
    
  }


  loadmore()
  {
    this.loading = true
    this.offset += STEP
    this.fetch()
    this.loading = false
  }

}
