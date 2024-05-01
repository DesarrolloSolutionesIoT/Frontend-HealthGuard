import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = ""
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  async signIn(email: string, password: string) {
    try {
      const users = await this.http.get<any>(`${this.baseUrl}/users`).toPromise();
      const foundUser = users.find((user: any) => user.email === email && user.password === password);
      if (foundUser) {
        console.log("User found");
        return foundUser;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}/api/v1/users`)
  }

  createUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/users`, user)
  }
}
