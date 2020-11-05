import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usersURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${this.usersURL}/login`, {email, password});
  }

  register(id:any, email: string, password: string, firstname: string, lastname: string, contact: number, location: string) {
    return this.httpClient.post<any>(`${this.usersURL}/users`, {id, email, password, firstname, lastname, contact, location});
  }

  getUser(id: number) {
    return this.httpClient.get<any>(`${this.usersURL}/users/${id}`);
  }
}
