import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(user){
    return this.http.post("http://localhost:3000/api/users/signup",user);
  }

  logIn(user){
    return this.http.post("http://localhost:3000/api/users/login",user);
  }

  setUser(user):void{
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser",user_string);
  }

  setToken(token):void{
    localStorage.setItem('accessToken',token);
  }

  getToken(){
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(){
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)){
      let user = JSON.stringify(user_string);
      return user;
    } else {
      return null;
    }
  }

  logOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem("currentUser");
  }

}
