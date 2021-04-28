import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpService: HttpClient) { }

  getItems() {
    return this.httpService.get("http://localhost:8080/api/admin/items");
  }

  deleteItem(id: string){
    return this.httpService.delete('http://localhost:8080/api/admin/deleteProduct/'+id,{responseType: 'text' as 'json'});
  }

}


