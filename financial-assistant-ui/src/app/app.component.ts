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

}
