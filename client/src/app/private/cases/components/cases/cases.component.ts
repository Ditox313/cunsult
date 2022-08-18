import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Case } from 'src/app/shared/other/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CommentsService } from 'src/app/shared/modules/comments-module/services/comments.service';
import { CaseService } from '../../services/case.service';
import { AuthService } from 'src/app/auth/services/auth.service';

// Шаг пагинации
const STEP = 3

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit, OnDestroy {
  currentUser: any
  loading: Boolean = false
  cases: Case[] = []
  casesFinaly: Case[] = []
  offset: any = 0
  limit: any = STEP
  xsSub: Subscription
  noMoreCases: Boolean = false


  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router, private commentsService: CommentsService,private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true
    this.fetch()


    // Получаем текущего юзера
    this.auth.get_user().subscribe((user)=>{
      this.currentUser = user
    });
    
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


      // Преобразовываем массив с кейсами и добавляем в каждый кейс колличество комментариев
      of(this.cases).pipe(
        map(
          cases => {
            cases.forEach(xscase => {
              this.commentsService.getComments(xscase._id).subscribe(data => {
                xscase.comNum = data.length
              })
            });
            return cases
          }
        )
      ).subscribe(data => {
        // console.log('После подписки',data);
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
