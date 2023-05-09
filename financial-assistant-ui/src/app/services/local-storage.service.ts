import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly AUTH_TOKEN = 'authToken';

  constructor() { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key)
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
}
