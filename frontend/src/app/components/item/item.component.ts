import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  itemArray: [];
  formCreate;
  selectedFile: File = null;
  pathImg: String;
  modal = [];
  constructor(private itemService: ItemService, private formBuilder: FormBuilder) {
    this.formCreate = formBuilder.group({
      title: ['',Validators.required],
      category: ['',Validators.required],
      description: ['',Validators.required],
      photo: ['',Validators.required],
    });
  }

  ngOnInit() {
    this.cleanModal();
    const token = localStorage.getItem('accessToken');
    this.itemService.loadMyItems(token).subscribe(data => {
      this.itemArray = JSON.parse(JSON.stringify(data))['item'];
      console.log(this.itemArray);
    });
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.itemService.uploadImage(this.selectedFile).subscribe(data => {
      console.log(data['path']);
      if (data['status'] === "Imagen subida"){
        this.pathImg = data['path'];
      } else {
        this.pathImg = '';
      }
    });
  }

  addItem(){
    if (this.formCreate.valid){
      const token = localStorage.getItem('accessToken');
      const item = {
        title: this.formCreate.get('title').value,
        category: this.formCreate.get('category').value,
        description: this.formCreate.get('description').value,
        photo: this.pathImg,
        owner: token
      };
      this.itemService.saveItem(item).subscribe(data => {
        let array = {_id: item['_id'],title: item['title'],category: item['category'],description: item['description'], date: item['date'], owner: item['owner'], photo: item['photo']} as never;
        this.itemArray.push(array);
      });
      location.reload();
    } else {
      alert("Rellena todos los campos");
    }

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

  rellenarModal(item){
    this.cleanModal();
    this.modal['title'] = item.title;
    this.modal['category'] = item.category;
    this.modal['description'] = item.description;
    this.modal['date'] = item.date;
    this.modal['photo'] = item.photo;
  }

}
