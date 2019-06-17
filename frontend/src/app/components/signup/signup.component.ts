import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup;
  showAlert: Boolean;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
    this.formSignup = formBuilder.group({
      name: ['',[Validators.required,Validators.pattern('/^[0-9]*$')]],
      surname: ['',[Validators.required,Validators.pattern('/^[0-9]*$')]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required,Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      pwd: ['',[Validators.required,Validators.minLength(6)]],
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
    }

  }

}
