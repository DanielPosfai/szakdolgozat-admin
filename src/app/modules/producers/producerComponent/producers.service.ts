import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {
  
  constructor(private httpService: HttpClient) { }
  
  deleteProducer(id: string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteProducer/'+id,{responseType: 'text' as 'json'});
  }

  getProducers() {
    return this.httpService.get("http://localhost:8080/api/admin/producers");
  }

}


