import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');
        if(token){
            req = req.clone({
                headers:req.headers.set('Authorization', 'Basic ' + token)
            });
        }
        return next.handle(req);
  }
}