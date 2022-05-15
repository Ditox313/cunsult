import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup; //Инициализируем нашу форму
  uSub!: Subscription; //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него


  // Инжектируем необходимые сервисы в класс для их последующего использования
  constructor( private router: Router, private route: ActivatedRoute, private auth: AuthService) { }




  ngOnInit(): void {
    // Описываем элементы которые есть в форме(контролы). То есть инициализируем форму
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });



    // Собираем информацию о текущем роуте и выводим соответствующие сообщения(тосты)
    this.route.queryParams.subscribe(function(params: Params){
      if(params['registered'])
      {
        // Запускам метод отображения ошибки materialyze
         MaterialService.toast("Теперь вы можете зайти в систему используя свои данные");
      }
      else if(params['accessDenied'])
      {
        // Запускам метод отображения ошибки materialyze
         MaterialService.toast("Сначала авторизируйтесь в системе");
      }
      else if(params['sessionFailed'])
      {
        // Запускам метод отображения ошибки materialyze
         MaterialService.toast("Пожалуйста войдите в систему заново");
      }
    });
  }


// Отписываемся от нашего стрима, когда переходим на другую страницу, что бы не было утечки памяти
  ngOnDestroy(){
    if(this.uSub)
    {
      this.uSub.unsubscribe();
    }
  }



  // Обрабатываем отправку форму
  onSubmit(): void {
    this.form.disable();
    
    // Создаем пользователя
    const user = {
      email: this.form.value.email,
      password:  this.form.value.password
    }

    // Когда auth.login(из сервиса auth.service) успешно отработает(как промис), перенаправляем на нужную страницу и обрататываем ошибку
    this.uSub = this.auth.login(user).subscribe(
      (res) => this.router.navigate(['/site/cases']),
      error => {
        // Запускам метод отображения ошибки materialyze
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
      
    )
  }




}
