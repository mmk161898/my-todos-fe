import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http:HttpClient
  ) { }

  authenticateUser(userName: string, password: string) {
    if (userName === 'Meet' && password === 'mmk') {
      sessionStorage.setItem('authenticatedUser', userName);
      return true;
    }
    return false;
  }


  executeAuthenticateService(username : string, password : string) {
    let basicAuthenticationString = 'Basic ' + window.btoa(username + ":" + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthenticationString
    })

    return this.http.get<AuthenticationBean>(`http://localhost:8080/basic-auth`,
      { headers }).pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username);
            sessionStorage.setItem('token', basicAuthenticationString);
          }
        )
      );
  }

  executeJWTAuthenticateService(username: string, password: string) {

    return this.http.post<any>(`http://localhost:8080/authenticate`,
      {
        username,
        password
      }
    ).pipe(
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username);
            sessionStorage.setItem('token', `Bearer ${data.token}`);
          }
        )
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('token')
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null)
  }

  logout() {
    // console.log(sessionStorage.getItem('token'))
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authenticatedUser');
  }

}


export class AuthenticationBean{

  constructor(public message: string) { }

}
