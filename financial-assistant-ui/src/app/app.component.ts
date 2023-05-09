import { Component } from '@angular/core';
import {RegisterRequest} from "./models/auth/register-request";
import {AuthService} from "./services/auth.service";
import {LocalStorageService} from "./services/local-storage.service";
import {AuthenticationResponse} from "./models/auth/authentication-response";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;

  public registered = false;

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }


  register() {
    const request = new RegisterRequest();
    request.email = this.email;
    request.password = this.password;
    request.firstname = this.firstname;
    request.lastname = this.lastname;
    this.authService.register(request)
      .subscribe((response: AuthenticationResponse) => {
        this.registered = true;
        console.log(response.token);
        this.localStorageService.saveAuthToken(response.token);
      });
  }

  check() {
    this.authService.checkRegistration().subscribe((result) => {
      console.log(result);
    })
  }
}
