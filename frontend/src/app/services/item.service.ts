import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  loadItems(){
    return this.http.get("http://localhost:3000/api/items");
  }

  loadMyItems(token){
    return this.http.get("http://localhost:3000/api/items/own/"+token);
  }

  saveItem(item){
    return this.http.post("http://localhost:3000/api/items",item);
  }

  delItem(id: String){
    return this.http.delete("http://localhost:3000/api/items/"+id);
  }

}
