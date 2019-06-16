import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userList: Boolean;
  itemList: Boolean;
  constructor() {
  }

  ngOnInit() {
    this.userList = false;
    this.itemList = false;
  }

  loadUsers(){
    this.itemList = false;
    this.userList = true;
  }

  loadItems(){
    this.userList = false;
    this.itemList = true;

  }

}
