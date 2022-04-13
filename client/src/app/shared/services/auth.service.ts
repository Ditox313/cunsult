// Сервис авторизации


import { User } from '../other/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


// Даем возможность инжектировать сервисы в класс
@Injectable({
   providedIn: 'root' //Автоматичеки регистриует сервис в главном модуле
})


export class AuthService
{


   private token = ''; //В эту переменную получим токет, который придет как ответ из функции login

   constructor(private http: HttpClient){}



   // Делаем запрос на сервис. ПОлучаем или не получаем токен, который потом будем использовать в запросах
   login(user: User) : Observable<{ token : string }> //Возвращаем резульат стрима(Ответ), из которого вернется token типа string
   {
      return this.http.post<{ token : string }>('/api/auth/login', user).pipe(  //Делаем ajax на нужный бэкэнд роут. Отдаем user
         tap(({token})=> { //Сохраням токен в переменную
            localStorage.setItem('auth-token', token);//Добавляем токен в localStorage
            this.setToken(token);
         })
      );
   } 





   // Делаем запрос на сервер, получаем  ответ типа User
   register(user: User) : Observable<User>
   {
      return this.http.post<User>('/api/auth/register', user);
   }






   // Изменят приватную переменную token
   setToken(token: string)
   {
      this.token = token;
   }


   // Что бы получать токен в других классах и использовать его(Что бы добовлять его к различным запросам)
   getToken(): string
   {
      return this.token;
   }


   // Определяем находится ли пользователь в сессии(Есть токен или нет)
   isAuthenticated(): boolean
   {
      return !!this.token;
   }


   // Выход из системы
   logout()
   {
      this.setToken('');
      localStorage.clear();
   }
}