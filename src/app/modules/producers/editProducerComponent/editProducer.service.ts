import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProducerService {

  private editUserUrl = 'http://localhost:8080/api/admin/editProducer/';
  private getUserUrl = 'http://localhost:8080/api/admin/producer/';

  constructor(private httpClient: HttpClient) { }

  editUser(newUser: User, id: string): Observable<any> {
    return this.httpClient.put<User>(this.editUserUrl + id, newUser, { responseType: 'text' as 'json' });
  }

  getProducer(id: string): Observable<any> {
    return this.httpClient.get<User>(this.getUserUrl + id);
  }

}
