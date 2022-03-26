import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private hardcoded: HardcodedAuthenticationService,
    private basicAuth: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    // this.hardcoded.logout();
    this.basicAuth.logout();
  }

}
