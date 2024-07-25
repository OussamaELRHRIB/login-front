import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const requestBody = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret)
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    console.log('Login request body:', requestBody.toString()); // Debugging log

    return this.http.post<any>(this.apiUrl, requestBody.toString(), { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Login request failed', error);
          return throwError(error);
        })
      );
  }
}
