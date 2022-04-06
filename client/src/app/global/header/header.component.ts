import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  // Получаем триггер для переключения мобильного меню
  @ViewChild('xs_header__top___mob___trigger') xs_header__top___mob___trigger : ElementRef;


  // Получаем мобильное меню
  @ViewChild('mobileMenu') mobileMenu : ElementRef;


  // Получаем крестик закрытия мобильного меню
  @ViewChild('mobileMenuClose') mobileMenuClose : ElementRef;



  ngOnInit(): void {
  }



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


}
