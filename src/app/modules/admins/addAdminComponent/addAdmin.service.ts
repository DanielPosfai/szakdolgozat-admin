import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddAdminService {

  private addUser = 'http://localhost:8080/api/admin/addAdmin';

  constructor(private httpClient: HttpClient) { }

  addNewUser(newUser: User): Observable<any> {
    return this.httpClient.post<User>(this.addUser, newUser,{ responseType: 'text' as 'json'});    
  }
  
}
