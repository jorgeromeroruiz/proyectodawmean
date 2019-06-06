import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  styles: []
})
export class HeaderComponent implements OnInit {
  appTitle: String = 'ProyectoDAW';
  constructor() { }

  ngOnInit() {
  }


  status: boolean = false;
clickEvent(){
    this.status = !this.status;       
}
}

