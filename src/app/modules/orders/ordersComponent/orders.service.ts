import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpService: HttpClient) { }

  getOrders() {
    return this.httpService.get("http://localhost:8080/api/admin/orders");
  }

  deleteOrder(id: string){
    return this.httpService.delete('http://localhost:8080/api/admin/deleteOrder/'+id,{responseType: 'text' as 'json'});
  }
}


