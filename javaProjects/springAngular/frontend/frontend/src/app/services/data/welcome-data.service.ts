import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {
  baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  executeHelloBeanService() {
    return this.http.get<HelloBean>(this.baseUrl + 'helloBean');
  }

  executeHelloBeanServiceWithVariable(name) {
    // let basicAuthHeaderString = this.createBasicAuthHeader();

    // // options crsf cross site request frogery
    // //  WSCA
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString,
    // });
    // console.log(headers)

    return this.http.get<HelloBean>(
      `${this.baseUrl}helloBean/${name}`
      // , {
      // headers
    );
  }

  // createBasicAuthHeader() {
  //   let username = 'user';
  //   let password = 'password';
  //   let basicAuthHeaderString =
  //     'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
}
