import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';
import { FooterComponent } from '../../../global/footer/footer.component';
import {MaterialInstance} from '../../other/interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserProfile} from '../../other/interfaces'
import { Observable } from 'rxjs';

import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

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

  // Получаем input загрузки файлов в профиле
  @ViewChild('input') inputRef : ElementRef;


  modal: MaterialInstance;
  form!: FormGroup; //Инициализируем нашу форму

  // Переменная для стрима при получении юзера
  user$: any;
  // Переменная для стрима при обновлении юзера
  userUpdate$ : any
  // Храним файл который будем сохранять на сервер
  xs_avatar: File
  // Переменная для превью аватарки
  avatarPreview : any= 'https://static.tildacdn.com/tild3633-6532-4233-a631-363261663462/profile.png'
  // Данные  пользователя в сайдбаре
  userNameSidebar : string
  userSecondnameSidebar : string
  userGroupnameSidebar : string
  userWorkposSidebar : string
  userCitySidebar : string
  userDateSidebar : any



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
      city: new FormControl(null, []),
    }); 


    this.user$ = this.auth.get_user().subscribe((res) => {
      if(res.xsAvatar)
      {
        this.avatarPreview = res.xsAvatar
      }

      this.userNameSidebar = res.name
      this.userSecondnameSidebar = res.secondName
      this.userGroupnameSidebar = res.groupName
      this.userWorkposSidebar = res.workPos
      this.userCitySidebar = res.city
      this.userDateSidebar = res.date
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
      phone: res.phone, 
      name: res.name, 
      secondName: res.secondName, 
      thirdName: res.thirdName, 
      groupName: res.groupName, 
      specialization: res.specialization, 
      workPos: res.workPos,
      year: res.year,
      city: res.city
    })

    if(res.xsAvatar)
    {
      this.avatarPreview = res.xsAvatar
    }

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
    const salt = bcrypt.genSaltSync(10);
    const password = this.form.value.password;

    // Формируем объект юзера
    const user = {
      email: this.form.value.email,
      password:   bcrypt.hashSync(password, salt),
      phone:  this.form.value.phone,
      name:  this.form.value.name,
      secondName:  this.form.value.secondName,
      thirdName:  this.form.value.thirdName,
      groupName:  this.form.value.groupName,
      specialization:  this.form.value.specialization,
      workPos:  this.form.value.workPos,
      year:  this.form.value.year,
      city: this.form.value.city,
    }


  
    this.userUpdate$ = this.auth.update(user, this.xs_avatar).subscribe((res)=> {
        this.form.patchValue({ 
        email: res.email, 
        phone: res.phone, 
        name: res.name, 
        secondName: res.secondName, 
        thirdName: res.thirdName, 
        groupName: res.groupName, 
        specialization: res.specialization, 
        workPos: res.workPos,
        year: res.year,
        city: res.city
      })

      this.userCitySidebar = res.city

      if(res.xsAvatar)
      {
        this.avatarPreview = res.xsAvatar
      }
      

      MaterialService.toast("Данные изменены");
    })
    
  }



  // Тригер кнопки загрузки файла
  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }


  //Обрабатываем загрузку аватарки
  onAvatarFileUpload(event: any)
  {
    const file = event.target.files[0]
    // Сохраняем выбранный файл
    this.xs_avatar = file

    const reader = new FileReader()

    // Когда загрузится картинка
    reader.onload = () => {
      this.avatarPreview = reader.result
    }
    reader.readAsDataURL(file)
  }

}
