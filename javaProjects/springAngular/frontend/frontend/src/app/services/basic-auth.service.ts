import { API_URL } from './../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTH_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}

  // authenticate(username, password) {
  //   if (password === '123' && username === 'spring.angular') {
  //     sessionStorage.setItem('authenticatedUser', username);
  //     return true;
  //   }
  //   return false;
  // }

  executeJWTAuthService(username, password) {
    return this.http
      .post<any>(`${API_URL}authenticate`, {
        username,
        password,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTH_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        })
      );
    // if proper response coming back map data using pipe
  }

  executeAuthService(username, password) {
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });
    return this.http
      .get<AuthenticationBean>(`${API_URL}basicauth`, {
        headers,
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTH_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        })
      );
    // if proper response coming back map data using pipe
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem('token');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTH_USER);
    return user !== null;
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
