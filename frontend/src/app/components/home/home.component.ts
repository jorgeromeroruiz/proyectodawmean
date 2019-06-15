import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: []
})
export class HomeComponent implements OnInit {

  chkUser: Boolean;
  itemArray = [];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.chkUser = false;
    this.chkLogin();
    if (this.chkUser){
      this.itemService.loadItems().subscribe(data => {
        this.itemArray = JSON.parse(JSON.stringify(data));
        console.log(this.itemArray);
      });
    }
  }

  chkLogin(){
    let token = localStorage.getItem('accessToken');
    if ((token !== '') || (typeof token !== 'undefined')){
      this.chkUser = true;
    }
  }

}
