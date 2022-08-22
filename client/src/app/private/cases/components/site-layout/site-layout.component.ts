import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../../../front/components/footer/footer.component';
import {Case, MaterialInstance} from '../../../../shared/other/interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { CaseService } from '../../services/case.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    public caseServise: CaseService
  ) {}

  // Получаем триггер для переключения мобильного меню
  @ViewChild('xs_header__top___mob___trigger')
  xs_header__top___mob___trigger: ElementRef;

  // Получаем мобильное меню
  @ViewChild('mobileMenu') mobileMenu: ElementRef;

  // Получаем крестик закрытия мобильного меню
  @ViewChild('mobileMenuClose') mobileMenuClose: ElementRef;

  // Получаем модальное окно
  @ViewChild('modal') modalRef: ElementRef;

  // Получаем input загрузки файлов в профиле
  @ViewChild('input') inputRef: ElementRef;

  // Получаем триггер для сайдбара
  @ViewChild('sigebarTrigger') sigebarTrigger: ElementRef;

  // Получаем триггер для сайдбара тег path
  @ViewChild('sidebarTriggerPath') sidebarTriggerPath: ElementRef;

  // // Получаем открытый сайдбар
  @ViewChild('sidebar_open') sidebar_open: ElementRef;

  // // Получаем закрытый сайдбар
  @ViewChild('sidebar_close') sidebar_close: ElementRef;

  // // Получаем обертку компонента
  @ViewChild('component') xscomponent: ElementRef;

  modal: MaterialInstance;
  form!: FormGroup; //Инициализируем нашу форму

  // Переменная для стрима при получении юзера
  user$: any;

  // Получаем массив кейсов данного юзера
  userCases: Case[] = []
  // Переменная для стрима при обновлении юзера
  userUpdate$: any;
  // Храним файл который будем сохранять на сервер
  xs_avatar: File;
  // Переменная для превью аватарки
  avatarPreview: any =
    'https://static.tildacdn.com/tild3633-6532-4233-a631-363261663462/profile.png';

  // Данные  пользователя в сайдбаре
  userNameSidebar: string;
  userSecondnameSidebar: string;
  userCitySidebar: string;
  userDateSidebar: any;
  userProgramSidebar: any;
  userSpecialyzationSidebar: string;
  userBtnSpecMenedgment: string;
  userBtnSpecOtrasl: string;

  ngOnInit(): void {
    // Описываем элементы которые есть в форме(контролы). То есть инициализируем форму
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      thirdName: new FormControl(null, [Validators.required]),
      program: new FormControl(null, [Validators.required]),
      specialization: new FormControl(null, [Validators.required]),
      workPos: new FormControl(null, []),
      year: new FormControl(null, [Validators.required]),
      city: new FormControl(null, []),
      company: new FormControl(null, []),
      otraslSpec: new FormControl(null, []),
      functionsNapravlenie: new FormControl(null, []),
      opyt: new FormControl(null, []),
      education: new FormControl(null, []),
      skills: new FormControl(null, []),
      languages: new FormControl(null, []),
      dopInfo: new FormControl(null, []),
      family: new FormControl(null, []),
      hobby: new FormControl(null, []),
      publication: new FormControl(null, []),
      compitations: new FormControl(null, []),
      socials: new FormControl(null, []),
    });

    this.user$ = this.auth
      .get_user()
      .pipe(
        map((user) => {
          this.caseServise.get_all_cases_by_id(user._id).subscribe((cases) => {
            this.userCases = this.caseServise.xscases
          });

          return user;
        })
      )
      .subscribe((res) => {
        if (res.xsAvatar) {
          this.avatarPreview = res.xsAvatar;
        }

        this.userNameSidebar = res.name;
        this.userSecondnameSidebar = res.secondName;
        this.userProgramSidebar = res.program;
        this.userSpecialyzationSidebar = res.specialization;
        this.userCitySidebar = res.city;
        this.userDateSidebar = res.date;
        this.userBtnSpecMenedgment = res.functionsNapravlenie;
        this.userBtnSpecOtrasl = res.otraslSpec;
      });
  }

  ngAfterViewInit(): void {
    // Инициализируем модальное окно
    this.modal = MaterialService.initModalPos(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
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

  // Открываем модалку для редактирования профиля
  modalEditProfile() {
    this.modal.open();
    //  Получаем пользователя
    this.user$ = this.auth.get_user().subscribe((res) => {
      this.form.patchValue({
        email: res.email,
        phone: res.phone,
        name: res.name,
        secondName: res.secondName,
        thirdName: res.thirdName,
        program: res.program,
        specialization: res.specialization,
        workPos: res.workPos,
        year: res.year,
        city: res.city,
        company: res.company,
        otraslSpec: res.otraslSpec,
        functionsNapravlenie: res.functionsNapravlenie,
        opyt: res.opyt,
        education: res.education,
        skills: res.skills,
        languages: res.languages,
        dopInfo: res.dopInfo,
        family: res.family,
        hobby: res.hobby,
        publication: res.publication,
        compitations: res.compitations,
        socials: res.socials,
      });

      if (res.xsAvatar) {
        this.avatarPreview = res.xsAvatar;
      }

      MaterialService.updateTextInputs();
    });
  }

  // Закрываем модалку для редактирования профиля
  closeModalEditProfile() {
    this.modal.close();
  }

  // Отправляем форму редактирования профиля
  onSubmitProfile() {
    // const salt = bcrypt.genSaltSync(10);
    // const password = this.form.value.password;

    // Формируем объект юзера
    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      thirdName: this.form.value.thirdName,
      program: this.form.value.program,
      specialization: this.form.value.specialization,
      workPos: this.form.value.workPos,
      year: this.form.value.year,
      city: this.form.value.city,
      company: this.form.value.company,
      otraslSpec: this.form.value.otraslSpec,
      functionsNapravlenie: this.form.value.functionsNapravlenie,
      opyt: this.form.value.opyt,
      education: this.form.value.education,
      skills: this.form.value.skills,
      languages: this.form.value.languages,
      dopInfo: this.form.value.dopInfo,
      family: this.form.value.family,
      hobby: this.form.value.hobby,
      publication: this.form.value.publication,
      compitations: this.form.value.compitations,
      socials: this.form.value.socials,
    };

    this.userUpdate$ = this.auth
      .update(user, this.xs_avatar)
      .subscribe((res) => {
        this.form.patchValue({
          email: res.email,
          phone: res.phone,
          name: res.name,
          secondName: res.secondName,
          thirdName: res.thirdName,
          program: res.program,
          specialization: res.specialization,
          workPos: res.workPos,
          year: res.year,
          city: res.city,
          company: res.company,
          otraslSpec: res.otraslSpec,
          functionsNapravlenie: res.functionsNapravlenie,
          opyt: res.opyt,
          education: res.education,
          skills: res.skills,
          languages: res.languages,
          dopInfo: res.dopInfo,
          family: res.family,
          hobby: res.hobby,
          publication: res.publication,
          compitations: res.compitations,
          socials: res.socials,
        });

        this.userNameSidebar = res.name;
        this.userSecondnameSidebar = res.secondName;
        this.userProgramSidebar = res.program;
        this.userSpecialyzationSidebar = res.specialization;
        this.userCitySidebar = res.city;
        this.userDateSidebar = res.date;
        this.userBtnSpecMenedgment = res.functionsNapravlenie;
        this.userBtnSpecOtrasl = res.otraslSpec;

        if (res.xsAvatar) {
          this.avatarPreview = res.xsAvatar;
        }

        MaterialService.toast('Данные изменены');
      });
  }

  // Тригер кнопки загрузки файла
  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  //Обрабатываем загрузку аватарки
  onAvatarFileUpload(event: any) {
    const file = event.target.files[0];
    // Сохраняем выбранный файл
    this.xs_avatar = file;

    const reader = new FileReader();

    // Когда загрузится картинка
    reader.onload = () => {
      this.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // Скрывать сайдбар при клике
  sidebarToggle() {
    this.sidebar_open.nativeElement.classList.toggle('dn');
    this.sidebar_close.nativeElement.classList.toggle('dn');
    this.xscomponent.nativeElement.classList.toggle('w100');
    this.sigebarTrigger.nativeElement.classList.toggle('xs_trigger__rotate');
    this.sidebarTriggerPath.nativeElement.classList.toggle('cb');
  }
}
