import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';
import { FooterComponent } from '../../../global/footer/footer.component';
import {MaterialInstance} from '../../other/interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserProfile} from '../../other/interfaces'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }


  
  // Получаем триггер для переключения мобильного меню
  @ViewChild('xs_header__top___mob___trigger') xs_header__top___mob___trigger : ElementRef;


  // Получаем мобильное меню
  @ViewChild('mobileMenu') mobileMenu : ElementRef;


  // Получаем крестик закрытия мобильного меню
  @ViewChild('mobileMenuClose') mobileMenuClose : ElementRef;


  // Получаем модальное окно
  @ViewChild('modal') modalRef : ElementRef;


  modal: MaterialInstance;
  form!: FormGroup; //Инициализируем нашу форму
  user$: any;



  ngOnInit(): void {
    // Описываем элементы которые есть в форме(контролы). То есть инициализируем форму
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      phone: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      thirdName: new FormControl(null, [Validators.required]),
      groupName: new FormControl(null, [Validators.required]),
      specialization: new FormControl(null, [Validators.required]),
      workPos: new FormControl(null, []),
      year: new FormControl(null, [Validators.required]),
    }); 
  }





  ngAfterViewInit(): void {
    // Инициализируем модальное окно
   this.modal =  MaterialService.initModalPos(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
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


  // Открываем модалку для редактирования профиля
  modalEditProfile()
  {
    this.modal.open();
    //  Получаем пользователя
   this.user$ = this.auth.get_user().subscribe((res) => {
    this.form.patchValue({ 
      email: res.email, 
      password: res.password, 
      phone: res.phone, 
      name: res.name, 
      secondName: res.secondName, 
      thirdName: res.thirdName, 
      groupName: res.groupName, 
      specialization: res.specialization, 
      workPos: res.workPos,
      year: res.year
    })

    MaterialService.updateTextInputs();
   });
  }

// Открываем модалку для редактирования профиля
  closeModalEditProfile()
  {
    this.modal.close();
  }

  // Отправляем форму редактирования профиля
  onSubmitProfile()
  {
    console.log('Отправлено');
    
  }


}
