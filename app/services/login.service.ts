import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  logIn(user){
    return this.http.post("http://localhost:3000/api/users/login",user);
  }

}
