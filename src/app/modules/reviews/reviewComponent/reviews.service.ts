import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

 
  constructor(private httpService: HttpClient) { }
  
  getProductReviews() {
    return this.httpService.get("http://localhost:8080/api/admin/productReviews");
  }

  getProducerReviews() {
    return this.httpService.get("http://localhost:8080/api/admin/producerReviews");
  }

  deleteProducerReview(id: string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteProducerReview/'+id,{responseType: 'text' as 'json'});
  }
  deleteProductReview(id: string) {
    return this.httpService.delete('http://localhost:8080/api/admin/deleteProductReview/'+id,{responseType: 'text' as 'json'});
  }

}


