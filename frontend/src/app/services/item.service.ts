import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Item } from '../models/item';
import { ItemComponent } from '../components/item/item.component';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  selectedItem: Item;
  item:Item [];
  readonly URL_API= 'http://localhost:3000/api/items';

  constructor(private http:HttpClient) {
    this.selectedItem = new Item();
  }
  getItems(){
    return this.http.get(this.URL_API);
  }

  postItem(Item: Item){
    return this.http.post(this.URL_API,Item);
  }
  //MODIFY
  putItem(Item: Item){
    return this.http.put(this.URL_API +`/${Item._id}`,Item);
  }
  deleteItem(_id : string){
    return this.http.delete(this.URL_API +`/${_id}`);
  }
}
