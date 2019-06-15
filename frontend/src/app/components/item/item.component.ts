import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {Item} from "../../models/item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  itemArray: [];
  formCreate: FormGroup;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.formCreate = new FormGroup({
      title: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required)
    });
    const token = localStorage.getItem('accessToken');
    this.itemService.loadMyItems(token).subscribe(data => {
      this.itemArray = JSON.parse(JSON.stringify(data))['item'];
      console.log(this.itemArray);

    });
  }

  addItem(){
    const token = localStorage.getItem('accessToken');
    const item = {
      title: this.formCreate.get('title').value,
      category: this.formCreate.get('category').value,
      description: this.formCreate.get('description').value,
      //photo: this.formCreate.get('photo').value,
      owner: token
    };
    this.itemService.saveItem(item).subscribe(data => {
      let array = {_id: item['_id'],title: item['title'],category: item['category'],description: item['description'], date: item['date'], owner: item['owner'], photo: item['photo']} as never;
      this.itemArray.push(array);
    });
  }

  deleteItem(id: String){
    console.log(id);
    if(confirm('¿Seguro que quieres eliminarlo?')){
      this.itemService.delItem(id)
          .subscribe();
      location.reload();
    }
  }

  resetForm(){
    this.formCreate.reset();
  }

}
