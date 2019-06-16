import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadUsers(){
    return this.http.get("http://localhost:3000/api/users");
  }

  saveUser(user){
    return this.http.put("http://localhost:3000/api/users/"+user._id,user);
  }

  signUp(user){
    return this.http.post("http://localhost:3000/api/users/signup",user);
  }

  delUser(id: String){
    return this.http.delete("http://localhost:3000/api/users/"+id);
  }

  loadPhone(id: String){
    console.log(id);
    return this.http.get("http://localhost:3000/api/users/phone/"+id);
  }
}
