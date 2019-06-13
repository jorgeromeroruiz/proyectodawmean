import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userArray: [];
  selectedUser: User = new User();
  createBtn: Boolean;
  updateBtn: Boolean;
  formCreate: FormGroup;
  showAlert: Boolean;
  updateOk: Boolean;
  updateErr: Boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.formCreate = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('',Validators.required)
    });
    this.updateBtn = false;
    this.createBtn = true;
    this.showAlert = false;
    this.updateOk = false;
    this.updateErr = false;
    this.userService.loadUsers().subscribe(data => {
      this.userArray = JSON.parse(JSON.stringify(data));
    });
  }

  createForm(){
    this.updateBtn = false;
    this.createBtn = true;
  }

  updateForm() {
    this.updateBtn = true;
    this.createBtn = false;
  }

  addOrEdit(){
    if (this.updateBtn){
      this.userService.saveUser(this.selectedUser).subscribe(data => {
       JSON.stringify(data);
       if (typeof data !== 'undefined'){
         if (data['status'] === "1"){
           this.updateErr = false;
           this.updateOk = true;
         } else {
           this.updateOk = false;
           this.updateErr = true;

         }
       } else {
         this.updateOk = false;
         this.updateErr = true;
       }
      });
    } else {
      const user = {
        name: this.formCreate.get('name').value,
        surname: this.formCreate.get('surname').value,
        email: this.formCreate.get('email').value,
        phone: this.formCreate.get('phone').value,
        pwd: this.formCreate.get('pwd').value
      };

      this.userService.signUp(user).subscribe(data => {
        JSON.stringify(data);
        if (typeof data['status'] === 'undefined'){
          let array = {_id: data['_id'],name: data['name'],surname: data['surname'],email: data['email'],phone: data['phone']} as never;
          this.userArray.push(array);
        } else if (data['status']['code'] === 11000){
          this.showAlert = true;
        }
      });
    }
  }

  openForEdit(usuario: User){
    this.selectedUser = usuario;
    this.updateForm();
  }

  delete(id: String){
    this.userService.delUser(id).subscribe(data => {
      this.userArray = this.userArray.filter(x => x != this.selectedUser) as never;
      this.selectedUser = new User();
    });
  }
}
