import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;
  showAlert: Boolean;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.formSignup = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('',Validators.required)
    });
    this.showAlert = false;
    if (this.authService.getToken()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){
    const user = {
      name: this.formSignup.get('name').value,
      surname: this.formSignup.get('surname').value,
      email: this.formSignup.get('email').value,
      phone: this.formSignup.get('phone').value,
      pwd: this.formSignup.get('pwd').value
    };

    this.authService.signUp(user).subscribe(data => {
      JSON.stringify(data);
      if (typeof data['status'] === 'undefined'){
        this.authService.setUser(data);
        let token = data['_id'];
        this.authService.setToken(token);
        location.reload();
        this.router.navigate(['/home']);
      } else if (data['status']['code'] === 11000){
        this.showAlert = true;
      }
    });
  }

}
