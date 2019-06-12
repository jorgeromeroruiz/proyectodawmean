import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private loginService: LoginService, private router: Router){}


  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    });
  }

  onSubmit(){

    const user = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    };
    console.log(user);
    this.loginService.logIn(user).subscribe();
  }
}
