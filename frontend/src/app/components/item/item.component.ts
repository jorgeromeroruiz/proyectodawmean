import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers:[ItemService]
})
export class ItemComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItem();
  }

  addItem(form: NgForm){
    //console.log(form.value);
    if(form.value._id){
      this.itemService.putItem(form.value).subscribe(res=>{
        console.log(res)
      })
    }else {
      this.itemService.postItem(form.value).subscribe(res => {
        console.log(res);
        this.resetForm(form);
        this.getItem();
  
      })    ;
    }
    
  }

  getItem(){
    //console.log(form.value);
    this.itemService.getItems().subscribe(res => {
      
      this.itemService.item = res as Item[];
      console.log(res);
      
    })
  }

  editItem(item:Item){
    this.itemService.selectedItem = item;
    //this.itemService.putItem(item._id)
  }

  deleteItem(_id: string){
    if(confirm('Seguro que quieres eliminarlo??')){
      this.itemService.deleteItem (_id)
      .subscribe(res=>{
        console.log(res);
      this.getItem();
    })
    }
    //this.itemService.putItem(item._id)
  }
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.itemService.selectedItem = new Item();
    }
  }
}
