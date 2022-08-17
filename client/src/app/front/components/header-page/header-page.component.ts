import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],
})
export class HeaderPageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  // Получаем триггер для переключения мобильного меню
  @ViewChild('xs_header__top___mob___trigger')
  xs_header__top___mob___trigger: ElementRef;

  // Получаем мобильное меню
  @ViewChild('mobileMenu') mobileMenu: ElementRef;

  // Получаем крестик закрытия мобильного меню
  @ViewChild('mobileMenuClose') mobileMenuClose: ElementRef;

  // Проверяем, зареган или нет
  // xs_header__isAuthenticated: any;

  ngOnInit(): void {}

  // Переключаем мобильное меню
  trigger() {
    setTimeout(() => {
      this.xs_header__top___mob___trigger.nativeElement.classList.add(
        'xs_trigger__rotate'
      );
      setTimeout(() => {
        this.mobileMenu.nativeElement.classList.add('xs_mob_menu_on');
      }, 300);
    }, 300);

    this.mobileMenuClose.nativeElement.classList.remove('xs_trigger__rotate');
  }

  // Закрываем мобильное меню
  closeMobileMenu() {
    setTimeout(() => {
      this.mobileMenuClose.nativeElement.classList.add('xs_trigger__rotate');
      setTimeout(() => {
        this.mobileMenu.nativeElement.classList.remove('xs_mob_menu_on');
      }, 300);
    }, 300);

    this.xs_header__top___mob___trigger.nativeElement.classList.remove(
      'xs_trigger__rotate'
    );
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

}
