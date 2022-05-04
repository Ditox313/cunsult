import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

    form!: FormGroup; //Инициализируем нашу форму
    uSub!: Subscription; //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него


  // Инжектируем необходимые сервисы в класс для их последующего использования
  constructor( private router: Router, private route: ActivatedRoute, private auth: AuthService) { }




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


// Отписываемся от нашего стрима, когда переходим на другую страницу, что бы не было утечки памяти
  ngOnDestroy(){
    if(this.uSub)
    {
      this.uSub.unsubscribe();
    }
  }



  // Обрабатываем отправку формы
  onSubmit(): void {
    this.form.disable();
    

    // Создаем юзера(кандидата)
    const user = {
      email: this.form.value.email,
      password:  this.form.value.password,
      phone:  this.form.value.phone,
      name:  this.form.value.name,
      secondName:  this.form.value.secondName,
      thirdName:  this.form.value.thirdName,
      groupName:  this.form.value.groupName,
      specialization:  this.form.value.specialization,
      workPos:  this.form.value.workPos,
      year:  this.form.value.year,
    }

    // Выполняме метод auth.register из сервиса auth.service и в случае успеха делаем редирект на логин и обрабатываем ошибку
    this.uSub = this.auth.register(user).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
      
    )
  }

}
