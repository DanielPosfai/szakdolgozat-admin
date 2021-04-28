import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  
  constructor(private httpService: HttpClient) { }
  
  deleteAdmin(id: string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteAdmin/'+id,{responseType: 'text' as 'json'});
  }
  
  getAdmins() {
    return this.httpService.get("http://localhost:8080/api/admin/admins");
  }

}


