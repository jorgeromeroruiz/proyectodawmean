import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: []
})
export class HomeComponent implements OnInit {

  chkUser: Boolean;
  itemArray = [];
  modal = [];
  constructor(private itemService: ItemService, private userService: UserService) { }

  ngOnInit() {
    this.chkUser = false;
    this.cleanModal();
    this.chkLogin();
    if (this.chkUser){
      this.itemService.loadItems().subscribe(data => {
        this.itemArray = JSON.parse(JSON.stringify(data));
      });
    }
  }

  chkLogin(){
    let token = localStorage.getItem('accessToken');
    if ((token !== '') || (typeof token !== 'undefined')){
      this.chkUser = true;
    }
  }

  cleanModal(){
    this.modal['title'] = '';
    this.modal['category'] = '';
    this.modal['description'] = '';
    this.modal['date'] = '';
    this.modal['photo'] = 'thumbnail.svg';
    this.modal['phone'] = '';
    this.modal['fullname'] = '';
    this.modal['email'] = '';
  }

  itemUser(id){
    this.userService.loadPhone(id).subscribe(data => {
      this.modal['phone'] = data['phone'];
      this.modal['fullname'] = data['fullname'];
      this.modal['email'] = data['email'];
    });
  }

  rellenarModal(item){
    this.cleanModal();
    this.modal['title'] = item.title;
    this.modal['category'] = item.category;
    this.modal['description'] = item.description;
    this.modal['date'] = item.date;
    this.modal['photo'] = item.photo;
    this.itemUser(item.owner);
  }

}
