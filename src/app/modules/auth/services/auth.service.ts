import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../../models/auth-model';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private apiBaseUrl = 'http://localhost:8080';
  public accessToken: string | undefined;
  public userInfo: any | undefined;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken') || undefined;
    const userInfoString = localStorage.getItem('userInfo');
    this.userInfo = userInfoString !== null ? JSON.parse(userInfoString) : undefined
  }

  login(email:string, password:string) : Observable<boolean> {
    const body = {email,password};
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`,body).pipe(map((response) => {
      this.accessToken = response.accessToken
      this.userInfo = response.user
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      return true;
    }))
  }

  isLoggedIn() {
    return this.accessToken !== undefined;
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
    this.accessToken = undefined;
  }
}
