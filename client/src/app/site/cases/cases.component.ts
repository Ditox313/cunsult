import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Case } from 'src/app/shared/other/interfaces';
import { CaseService } from 'src/app/shared/services/case.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import {Message} from '../../shared/other/interfaces'

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

  constructor(public caseServise: CaseService, private rote: ActivatedRoute, private router: Router) { }

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
    });
    
  }


  loadmore()
  {
    this.loading = true
    this.offset += STEP
    this.fetch()
    this.loading = false
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




  // // Получаем триггер для переключения мобильного меню
  // @ViewChildren('dot_trigger') dot_trigger : QueryList<ElementRef>;


  // // Получаем мобильное меню
  // @ViewChild('dot_area') dot_area : ElementRef;


  // // Получаем крестик закрытия мобильного меню
  // @ViewChildren('dotAreaClose') dotAreaClose : QueryList<ElementRef>;


  // // Переключаем мобильное меню
  // openArea() {
  //   setTimeout(()=> {
  //     this.dot_trigger.nativeElement.classList.add('xs_trigger__rotate');
  //     setTimeout(()=>{
  //       this.dot_area.nativeElement.classList.add('xs_area_on');
  //     },300);
  //   }, 300);

  //   // this.dotAreaClose.nativeElement.classList.add('xs_trigger__rotate');
    
  //   // this.dotAreaClose.nativeElement.classList.remove('xs_trigger__rotate');
  // }






  



  // closeArea()
  // {
  //   setTimeout(()=> {
  //     this.dotAreaClose.nativeElement.classList.add('xs_trigger__rotate');
  //     setTimeout(() => {
  //       this.dot_area.nativeElement.classList.remove('xs_area_on');
  //     }, 100);
  //     this.dotAreaClose.nativeElement.classList.remove('xs_trigger__rotate');
  //   }, 100);

  //   this.dot_trigger.nativeElement.classList.remove('xs_trigger__rotate');
    

  // }

}
