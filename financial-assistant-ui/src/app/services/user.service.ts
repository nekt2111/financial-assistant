import {Injectable} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {User} from "../models/user";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn:'root'
})
export class UserService {

  private user: User;

  constructor(private localStorageService: LocalStorageService) {
  }

  public getCurrentUser(): User {
    if (!this.user) {
      this.setUser(this.localStorageService.getUser());
    }
    return this.user;
  }

  public setUser(user: User): void {
    this.localStorageService.saveUser(user);
    this.user = user;
  }

  public buildUserFromToken(token: any): User {
    const decodedToken = jwtDecode(token);
    const user = new User();
    // @ts-ignore
    user.email = decodedToken.sub;
    // @ts-ignore
    user.id = decodedToken.id;
    return user;
  }


}
