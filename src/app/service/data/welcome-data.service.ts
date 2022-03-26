import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';

export class HelloWorldBean{

  constructor(public message:string){


  }

}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  getResponseFromBE() {
    return this.http.get<HelloWorldBean> ("http://localhost:8080/hello-world-bean");
  }

  getResponseFromBEWithPathVariable(name: string) {
    // let basicAuthenticationString = this.createBaseAuth();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthenticationString
    // })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`
      // { headers }
    );
  }

  // createBaseAuth() {
  //   let username = 'Meet'
  //   let password = 'mmk'
  //   let basicAuthenticationString = 'Basic ' + window.btoa(username + ":" + password);
  //   return basicAuthenticationString;
  // }


}
