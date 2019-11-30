import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user){
    return this.http.post('http://localhost:8080/api/auth/signup',  user,{ observe: 'response' });
  }
  login(user) {
    return this.http.post('http://localhost:8080/api/auth/login', user,{ observe: 'response' });
  }
}
