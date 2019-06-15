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
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.loadItems().subscribe(data => {
      this.itemArray = JSON.parse(JSON.stringify(data));
    });
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

}
