import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '@app/shared/models/orderDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditOrderDetailsService {

  private editOrderDetailsUrl = 'http://localhost:8080/api/admin/editOrderDetails/';
  private getOrderDetailUrl = 'http://localhost:8080/api/admin/orderDetail/';

  constructor(private httpClient: HttpClient) { }

  editOrderDetail(newOrderDetail: OrderDetails, id: string): Observable<any> {
    return this.httpClient.put<OrderDetails>(this.editOrderDetailsUrl + id, newOrderDetail, { responseType: 'text' as 'json' });
  }

  getOrderDetail(id: string): Observable<any> {
    return this.httpClient.get<OrderDetails>(this.getOrderDetailUrl + id);
  }

}
