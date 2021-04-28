import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/shared/models/item.model';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {

  private editProductUrl = 'http://localhost:8080/api/admin/editProduct/';
  private getProductUrl = 'http://localhost:8080/api/admin/item/';

  constructor(private httpClient: HttpClient) { }

  editProduct(item: Item): Observable<any> {
    return this.httpClient.put<User>(this.editProductUrl, item, { responseType: 'text' as 'json' });
  }
  
  getProduct(id: string): Observable<any> {
    return this.httpClient.get<Item>(this.getProductUrl + id);
  }

}
