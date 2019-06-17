import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup;
  showAlert: Boolean;
  user: User;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
    this.formSignup = formBuilder.group({
      name: ['',[Validators.required,Validators.pattern('^[a-zA-Zñáéíóú-]{2,20}$')]],
      surname: ['',[Validators.required, Validators.pattern('^[a-zA-Zñáéíóú-]{2,20}$')]],
      email: ['',[Validators.required, Validators.pattern('^[a-z_0-9](\.?[a-z-_0-9]){2,40}@[a-z-_0-9]{2,20}.[a-zñáéíóúü]{2,5}$')]],
      phone: ['',[Validators.required,Validators.pattern('[6-9][0-9]{8}')]],
      pwd: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]{8,20}$')]],
      admin: 0
    });
  }

  ngOnInit() {
    this.showAlert = false;
    if (this.authService.getToken()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){
    if (this.formSignup.valid){
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
    } else {
      alert('Rellene todos los campos correctamente');
      console.log(this.formSignup)
    }

  }

}
