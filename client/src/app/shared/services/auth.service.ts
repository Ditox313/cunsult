// Сервис авторизации


import { User } from '../other/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import {UserProfile} from './../other/interfaces'


// Даем возможность инжектировать сервисы в класс
@Injectable({
   providedIn: 'root' //Автоматичеки регистриует сервис в главном модуле
})


export class AuthService
{


   private token = ''; //В эту переменную получим токет, который придет как ответ из функции login



   constructor(private http: HttpClient){}



   // Делаем запрос на сервис. ПОлучаем или не получаем токен, который потом будем использовать в запросах
   login(user: User) : Observable<{ token : string, token_mod: string }> //Возвращаем резульат стрима(Ответ), из которого вернется token типа string
   {
      return this.http.post<{ token : string, token_mod: string }>('/api/auth/login', user).pipe(  //Делаем ajax на нужный бэкэнд роут. Отдаем user
         tap(({token, token_mod})=> { //Сохраням токен в переменную
            localStorage.setItem('auth-token', token);//Добавляем токен в localStorage
            this.setToken(token);
         })

      )
   } 





   // Делаем запрос на сервер, получаем  ответ типа User
   register(user: User) : Observable<User>
   {
      return this.http.post<User>('/api/auth/register', user);
   }



   // Делаем запрос на сервер, получаем  ответ типа User
   get_user(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/auth/user')
  }



  getById(id: string): Observable<UserProfile>
  {
     return this.http.get<UserProfile>(`api/auth/user/${id}`);
  }




  // Редактируем позицию
  update(user: UserProfile, image?: File): Observable<UserProfile> {

   const fd = new FormData(); 
   fd.append('email', user.email);
   fd.append('password', user.password);
   fd.append('phone', user.phone);
   fd.append('name', user.name);
   fd.append('secondName', user.secondName);
   fd.append('thirdName', user.thirdName);
   fd.append('program', user.program);
   fd.append('specialization', user.specialization);
   fd.append('workPos', user.workPos);
   fd.append('year', user.year);
   fd.append('city', user.city);
   fd.append('company', user.company);
   fd.append('otraslSpec', user.otraslSpec);
   fd.append('functionsNapravlenie', user.functionsNapravlenie);
   fd.append('opyt', user.opyt);
   fd.append('education', user.education);
   fd.append('skills', user.skills);
   fd.append('languages', user.languages);
   fd.append('dopInfo', user.dopInfo);
   fd.append('family', user.family);
   fd.append('hobby', user.hobby);
   fd.append('publication', user.publication);
   fd.append('compitations', user.compitations);
   fd.append('socials', user.socials);
   
   
   
   
   
  
   if(image)
   {
      fd.append('xsAvatar', image, image.name);
   }



    return this.http.patch<UserProfile>('/api/auth/update/', fd);
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