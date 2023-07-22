import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: string[] = [];
  username!: string;
  accessToken!: string;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.post('http://localhost:8085/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data.accessToken;
    const jwtDecoded: any = jwtDecode(this.accessToken);
    this.username = jwtDecoded.sub;
    this.roles = jwtDecoded.scope;
    this.isAdmin = this.roles.includes('ADMIN');
    window.localStorage.setItem('accessToken', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.roles = [];
    this.username = '';
    this.accessToken = '';
    window.localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/login');
  }

  loadJwtFromLocalStorage() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      this.loadProfile({ accessToken });
    }
  }
}
