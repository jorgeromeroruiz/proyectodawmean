import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  styles: []
})
export class HeaderComponent implements OnInit {
  appTitle: String = 'NeedU';
  accessToken: String = '';
  admin: Boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.accessToken = this.authService.getToken();
    this.admin = false;
    this.chkAdmin();
    if (!this.admin){
      this.router.navigate(['/']);
    }
  }

  logOut(){
    this.authService.logOut();
    location.reload();
    this.router.navigate(['/']);
  }


  chkAdmin(){
    let token =  JSON.parse(this.authService.getCurrentUser());
    token = JSON.parse(token);
    if (this.authService.getCurrentUser() && (token['admin'] === 1)){
      this.admin = true;
    } else {
      this.admin = false;
    }
  }


}
