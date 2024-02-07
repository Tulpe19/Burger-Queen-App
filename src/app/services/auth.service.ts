import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { AuthResponse } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<AuthResponse> {
    const body = {email,password};
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`,body);
  }

}
