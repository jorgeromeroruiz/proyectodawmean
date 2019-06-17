import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../services/item.service";
import {Item} from "../../../models/item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  itemArray: [];
  selectedItem: Item = new Item();
  updateOk: Boolean;
  updateErr: Boolean;
  modalPhoto: String;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.loadItems().subscribe(data => {
      this.itemArray = JSON.parse(JSON.stringify(data));
    });
    this.modalPhoto = 'thumbnail.svg';
  }

  addOrEdit(){
    this.itemService.saveItem(this.selectedItem).subscribe(data => {
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
  }

  openForEdit(item: Item){
    this.selectedItem = item;
  }

  mostrarImagen(photo: String){
    this.modalPhoto = '';
    this.modalPhoto = photo;
  }

  delete(id: String){
    if(confirm('¿Seguro que quieres eliminarlo?')){
      this.itemService.delItem(id).subscribe(data => {
        this.itemArray = this.itemArray.filter(x => x != this.selectedItem) as never;
        this.selectedItem = new Item();
      });
    }
  }

}
