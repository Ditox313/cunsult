import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommentsService } from 'src/app/modules/comments-module/services/comments.service';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import {Message} from '../../shared/other/interfaces'
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  casesFinaly: Case[] = []
  offset: any = 0
  limit: any = STEP
  xsSub: Subscription
  noMoreCases: Boolean = false


  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router, private commentsService: CommentsService) { }

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

      of(this.cases).subscribe((xscases)=> {
        xscases.forEach(xscase => {
          this.commentsService.getComments(xscase._id).subscribe((comments) => {
            console.log(xscase);
            
          })
        })
        
        
        
      })
    });
    
    
  }


  loadmore()
  {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }




  // Удалить позицию
  onDeleteCase(event: Event, xscase): void
  {
    event.stopPropagation();


    const dicision = window.confirm(`Удалить кейс?`);

    if (dicision) {
      this.caseServise.delete(xscase._id).subscribe(res => {
        const idxPos = this.cases.findIndex(p => p._id === xscase._id);
        this.cases.splice(idxPos, 1);
        MaterialService.toast(res.message)
        
      }, error => {
        MaterialService.toast(error.error.message);
      })
    }
  }




  openArea(el)
  {
    console.log(el.nextSibling.classList.add('xs_area_on'));
  }

  closeArea(el)
  {
    console.log(el.parentElement.classList.remove('xs_area_on'));
    
  }




}
