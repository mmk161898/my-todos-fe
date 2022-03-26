import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService : BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'Meet'
    // let password = 'mmk'
    // let basicAuthenticationString = 'Basic ' + window.btoa(username + ":" + password);

    let basicAuthenticationString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthenticationString != null && username != null) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthenticationString
        }
      })
    }

    return next.handle(request)
  }

}
