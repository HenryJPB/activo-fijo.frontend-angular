/* -------------------------------------------------------------------------------------------------
  Bqto: 25/11/2024 11:59. Chequear adaptacion en mi proyecto 'login-form_front_main' 
----------------------------------------------------------------------------------------------------*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginModel } from '../core/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly msg$: Subject<any> = new Subject();
  public readonly currentLoginMsg: Observable<any> = this.msg$.asObservable();

  constructor(private httpClient:HttpClient, 
              private router:Router, 
             ) { }

  //-----------------------------------------------------------------------------------
  /* 
  login (loginModel:LoginModel){
    
    this.httpClient.post <string>(`${this.URL}/login`,loginModel).subscribe(receivedItem => {
      
      localStorage.setItem('access_token',JSON.stringify(receivedItem));

      this.goAdminPage();
            
    },err => {
            this.msg$.next(err.error);         
      }
    )
  }
  */
  //-----------------------------------------------------------------------------------
  login (loginModel:LoginModel){ 
    this.goAdminPage();   
  } 

  //-----------------------------------------------------------------------------------
  goAdminPage(){
      //this.router.navigate(['/admin']);
      this.router.navigate(['/pag-bienvenida']);
  }

  //-----------------------------------------------------------------------------------
  logout() {
    localStorage.clear();
    this.goLoginPage();
  }

  //---------------------------------------------------------------------------------------------
  isLoggedIn() {
    if(localStorage.getItem('access_token')!=null){
      this.goAdminPage();
    }
  }

  //----------------------------------------------------------------------------------------------
  getToken(){
    const userStorage = localStorage.getItem('access_token');
    return JSON.parse(userStorage!).access_token;
  }

  /*   *No Implementado yet!!!*   
  register(user:UserModel){

    return this.httpClient.post(`${this.URL}/register`,user,{observe: 'response', responseType: 'json'});

  }
  */

  //------------------------------------------------------------------------------------------
  private goLoginPage(){
    this.router.navigate(['/login']);
  }

}
