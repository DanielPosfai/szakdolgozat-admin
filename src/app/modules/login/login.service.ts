import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '@app/shared/models/userInfo.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public onError: Subject<string> = new Subject();

  constructor(private httpService: HttpClient) { }

  login(username: string, password: string) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpService.get("http://localhost:8080/api/admin/login?user=" + username, { headers });
    
  }

}


