import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public registrarUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/usuarios/signup`, user)
  }
}
