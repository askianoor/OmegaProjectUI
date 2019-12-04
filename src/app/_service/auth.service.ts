// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse, UserProfileResponse, UserAuditsResponse } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'http://localhost:54277/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}');
    }

    this.toastr.error('نام کاربری یا رمز عبور اشتباه است.', 'اعتبارسنجی ناموفق');
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // Verify user credentials on server to get token
  loginForm(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api/ApplicationUser/login', data, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('access_token', resp.access_token);
    this.router.navigate(['/dashboard']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  // Get profile data from server for Dashboard
  getProfileData(): Observable<UserProfileResponse> {
    return this.http
      .get<UserProfileResponse>(this.basePath + 'api/UserProfile')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

    // Get audit data from server for Dashboard
    getAudits(): Observable<UserAuditsResponse> {
      return this.http
        .get<UserAuditsResponse>(this.basePath + 'api/UserAudit')
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }
}
