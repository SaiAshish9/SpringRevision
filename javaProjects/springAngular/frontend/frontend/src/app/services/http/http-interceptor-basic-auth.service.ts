import { BasicAuthenticationService } from './../basic-auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  constructor(private basicAuthService: BasicAuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'user';
    // let password = 'password';
    // let basicAuthHeaderString =
    //   'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();
    console.log(basicAuthHeaderString && username)
    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        },
      });
    }

    return next.handle(request);
  }
}
