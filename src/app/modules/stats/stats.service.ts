import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@app/shared/models/order.model';
import { Stat } from '@app/shared/models/stat.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  

  public onError: Subject<string> = new Subject();

  constructor(
  private httpClient: HttpClient
  ) { }

  getStats(sDate:string, eDate: string): Observable<any>  {

    return this.httpClient.get<Order>("http://localhost:8080/api/admin/stats/"+sDate+"/"+eDate );

  }

}


