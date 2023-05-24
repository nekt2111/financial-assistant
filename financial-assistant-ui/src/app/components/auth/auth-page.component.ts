import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RegisterRequest} from "../../models/auth/register-request";
import {LoginRequest} from "../../models/auth/login-request";
import {LocalStorageService} from "../../services/local-storage.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  public isLoginActive = false;
  public email: string;
  public password: string;

  public showErrorMessage = false;
  public errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService,
              private localStorageService: LocalStorageService,
              private userService: UserService) {
  }

  public ngOnInit(): void {
    this.authService.isUserAuthenticated().then((isUserAuthenticated) => {
      if (isUserAuthenticated) {
        this.router.navigate(['']);
      }
    })

  }

  public changeAuthProcess() {
    this.showErrorMessage = false;
  }

  public registerUser(): void {
    const request = new RegisterRequest();
    request.email = this.email;
    request.password = this.password;
    this.authService.register(request).subscribe((response) => {
      this.localStorageService.saveAuthToken(response.token);
      this.setUserByToken(response.token);
      this.router.navigate(['']);
    }, (error: HttpErrorResponse) => {
      this.handleRegistrationError(error);
    });
  }

  private handleRegistrationError(error: HttpErrorResponse): void {
    if (error.status === HttpStatusCode.Conflict) {
      this.handleUserAlreadyExistsError();
    }
  }

  private handleUserAlreadyExistsError(): void {
    this.errorMessage = 'User with this email is already registered!';
    this.showErrorMessage = true;
  }

  public loginUser(): void {
    const request = new LoginRequest();
    request.email = this.email;
    request.password = this.password;
    this.authService.login(request).subscribe(response => {
      this.localStorageService.saveAuthToken(response.token);
      this.setUserByToken(response.token);
      this.router.navigate(['']);
    }, (error) => {
      this.handleLoginError(error)
    });
  }

  private setUserByToken(token: any): void {
    const user = this.userService.buildUserFromToken(token);
    this.userService.setUser(user);
  }

  private handleLoginError(error: HttpErrorResponse): void {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.handleUnauthorizedError();
    } else if (error.status === HttpStatusCode.NotFound) {
      this.handleUserNotFoundError();
    }
  }

  private handleUnauthorizedError(): void {
    this.errorMessage = 'Wrong email or password';
    this.showErrorMessage = true;
  }

  private handleUserNotFoundError(): void {
    this.errorMessage = `User with this email doesn't exist`;
    this.showErrorMessage = true;
  }

}
