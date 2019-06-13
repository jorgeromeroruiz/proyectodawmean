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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.accessToken = this.authService.getToken();
  }

  logOut(){
    this.authService.logOut();
    location.reload();
    this.router.navigate(['/']);
  }

}

