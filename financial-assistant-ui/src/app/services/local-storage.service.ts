import {Injectable} from "@angular/core";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly AUTH_TOKEN = 'authToken';
  private readonly USER = 'user';

  constructor() { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string): string {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    } else {
      return '';
    }
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

  public saveAuthToken(token: string): void {
    this.saveData(this.AUTH_TOKEN, token);
  }

  public getAuthToken(): string | null {
    return this.getData(this.AUTH_TOKEN);
  }

  public removeAuthToken(): void {
    return this.removeData(this.AUTH_TOKEN);
  }

  public saveUser(user: User): void {
    return this.saveData(this.USER, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(this.getData(this.USER));
  }

}
