import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  deleteCustomer(id:string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteCustomer/'+id,{responseType: 'text' as 'json'});
  }

  constructor(private httpService: HttpClient) { }

  getCustomers() {
    return this.httpService.get("http://localhost:8080/api/admin/customers");
  }

}


