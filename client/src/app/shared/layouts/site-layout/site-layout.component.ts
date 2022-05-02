import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }


  
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


   // Описываем метод выхода из системы
   logout(event: Event): void
  {

    // Отменяем перезагрузку страницы
    event.preventDefault();


    // Запускаем метод logout в сервисе авторизации
    this.auth.logout();

    // Делаем редирект на страницу логина
    this.router.navigate(["/login"]);
  }

}
