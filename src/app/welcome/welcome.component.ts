import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  welcomeMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private service:WelcomeDataService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  getDataFromService() {
    this.service.getResponseFromBE().subscribe(
      response => this.handleSuccessMessage(response),
      error =>this.handleErrorMessage(error)
      )

    console.log("Welcome Back");
  }

  getDataFromServiceWithPathVariable() {
    this.service.getResponseFromBEWithPathVariable(this.name).subscribe(
      response => this.handleSuccessMessage(response),
      error =>this.handleErrorMessage(error)
      )

    console.log("Welcome Back");
  }

  handleSuccessMessage(response : any) {
    console.log(response)
    this.welcomeMessage = response.message;
  }

  handleErrorMessage(error : any) {
    console.log(error);
    console.log(error.error);
    console.log(error.error.message);
    this.errorMessage = error.error.message;
  }
}
