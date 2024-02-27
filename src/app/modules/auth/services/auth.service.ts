import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../../models/auth-model';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private apiBaseUrl = 'http://localhost:8080'
  public accessToken: string | undefined

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken') || undefined
  }

  login(email:string, password:string) : Observable<boolean> {
    const body = {email,password};
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`,body).pipe(map((response) => {
      this.accessToken = response.accessToken
      localStorage.setItem('accessToken', this.accessToken)
      return true
    }))
  }

  isLoggedIn() {
    return this.accessToken !== undefined
  }

  logout() {
    localStorage.removeItem('accessToken')
    this.accessToken = undefined
  }
}
