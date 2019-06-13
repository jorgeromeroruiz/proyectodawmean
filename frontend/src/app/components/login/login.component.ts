import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  showAlert: Boolean;

  constructor(private authService: AuthService, private router: Router){}


  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('',Validators.required)
    });
    this.showAlert = false;
    if (this.authService.getToken()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){

    const user = {
      email: this.formLogin.get('email').value,
      pwd: this.formLogin.get('pwd').value
    };

    this.authService.logIn(user).subscribe(data => {
      JSON.stringify(data);
      if (data['error'] === '0'){
        this.showAlert = true;
      } else {
        this.authService.setUser(data);
        let token = data['_id'];
        this.authService.setToken(token);
        location.reload();
        this.router.navigate(['/']);
      }
    });

  }
}
