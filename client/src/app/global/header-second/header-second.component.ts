import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-second',
  templateUrl: './header-second.component.html',
  styleUrls: ['./header-second.component.css']
})
export class HeaderSecondComponent implements OnInit {

  constructor() { }

    // Получаем триггер для переключения мобильного меню
  @ViewChild('xs_header__top___mob___trigger') xs_header__top___mob___trigger : ElementRef;


  // Получаем мобильное меню
  @ViewChild('mobileMenu') mobileMenu : ElementRef;


  // Получаем крестик закрытия мобильного меню
  @ViewChild('mobileMenuClose') mobileMenuClose : ElementRef;



  // Переключаем мобильное меню
  trigger() {
    setTimeout(()=> {
      this.xs_header__top___mob___trigger.nativeElement.classList.add('xs_trigger__rotate');
      setTimeout(()=>{
        this.mobileMenu.nativeElement.classList.add('xs_mob_menu_on');
      },300);
    }, 300);

    this.mobileMenuClose.nativeElement.classList.remove('xs_trigger__rotate');
  }



  // Закрываем мобильное меню
  closeMobileMenu()
  {
    setTimeout(()=> {
      this.mobileMenuClose.nativeElement.classList.add('xs_trigger__rotate');
      setTimeout(() => {
        this.mobileMenu.nativeElement.classList.remove('xs_mob_menu_on');
      }, 300);
    }, 300);

    this.xs_header__top___mob___trigger.nativeElement.classList.remove('xs_trigger__rotate');
  }

  ngOnInit(): void {
  }

}
