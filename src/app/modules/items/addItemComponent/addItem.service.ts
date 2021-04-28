import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/shared/models/item.model';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  private addItem = 'http://localhost:8080/api/admin/addProduct';

  constructor(private httpClient: HttpClient) { }

  addNewItem(newItem: Item): Observable<any> {
    return this.httpClient.post<Item>(this.addItem, newItem,{ responseType: 'text' as 'json'}); 
      
  }
  
}
