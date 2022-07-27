import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';
import { FooterComponent } from '../../../global/footer/footer.component';
import { MaterialInstance } from '../../other/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../../other/interfaces';
import { Observable } from 'rxjs';

import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css'],
})
export class PageLayoutComponent implements OnInit {
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



  ngOnInit(): void {
    
  }


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

  // Описываем метод выхода из системы
  logout(event: Event): void {
    // Отменяем перезагрузку страницы
    event.preventDefault();

    // Запускаем метод logout в сервисе авторизации
    this.auth.logout();

    // Делаем редирект на страницу логина
    this.router.navigate(['/login']);
  }

}
