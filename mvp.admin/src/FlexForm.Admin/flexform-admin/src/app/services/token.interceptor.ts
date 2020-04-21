import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
      //,withCredentials : true
    });

    //request.headers
    //.set('Access-Control-Allow-Headers', 'Content-Type')
    //.set('Access-Control-Allow-Methods', 'GET')
    //.set('Access-Control-Allow-Origin', '*:4200');

    return next.handle(request);
  }
}