import {Component, OnChanges, OnInit} from '@angular/core';
import {RegisterRequest} from "./models/auth/register-request";
import {AuthService} from "./services/auth.service";
import {LocalStorageService} from "./services/local-storage.service";
import {AuthenticationResponse} from "./models/auth/authentication-response";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  public authenticated: Promise<boolean>;

  private readonly AUTH_URL = '/auth';


  public isUserAuthenticated(): void {
     this.authenticated = this.authService.isUserAuthenticated();
  }

  public isLoginPage(): boolean {
    return this.router.url === this.AUTH_URL;
  }


  public logout(): void {
    console.log(this.router.url)
    this.authService.logout();
    this.router.navigate(['']);
  }
}
