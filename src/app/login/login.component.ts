import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'Meet'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidCreds = false

  constructor(private router: Router,
    public hardcoded: HardcodedAuthenticationService,
    private basicAuth: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    // console.log('before ' + this.hardcoded.isUserLoggedIn());
    // if (this.userName === 'Meet' && this.password === 'mmk') {
    if (this.hardcoded.authenticateUser(this.username, this.password)) {
      // console.log('after ' + this.hardcoded.isUserLoggedIn());
      this.router.navigate(['welcome', this.username])
      this.invalidCreds = false;
    } else {
      this.invalidCreds = true;
    }
  }

  handleBasicAuthLogin() {
    this.basicAuth.executeAuthenticateService(this.username, this.password)
      .subscribe(
        data => {
        console.log(data);
        this.router.navigate(['welcome', this.username])
        this.invalidCreds = false;
        },
        error => {
          this.invalidCreds = true;
        }
      )
  }

  handleJWTAuthLogin() {
    this.basicAuth.executeJWTAuthenticateService(this.username, this.password)
      .subscribe(
        data => {
        console.log(data);
        this.router.navigate(['welcome', this.username])
        this.invalidCreds = false;
        },
        error => {
          this.invalidCreds = true;
        }
      )
  }

}
