import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //Generar token
  public generateToken(loginData:any){
    return this.http.post(`${baserUrl}/login`,loginData);
  }

  //Iniciamos Sesión y establecemos el token en el local storage
  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //Cerramos sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Obtener el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/actual-usuario`);
  }
}
