import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBackService {

  constructor(
    private http: HttpClient) { }
    private baseUrl = 'http://localhost:3000';
    private getHeader(): HttpHeaders{return new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token')
      
    }
    )}


    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      }
      return Promise.reject(error.error || 'Server error');
    }
    private apiCall<T>(method: string, url: string, body?: any): Observable<any> {
      const options = {
        headers: this.getHeader()
      };
      switch (method.toLowerCase()) {
        case 'get':
          return this.http.get<T>(`${this.baseUrl}/${url}`, options);
        case 'post':
          return this.http.post<T>(`${this.baseUrl}/${url}`, body, options);
        case 'put':
          return this.http.put<T>(`${this.baseUrl}/${url}`, body, options);
        case 'delete':
          return this.http.delete<T>(`${this.baseUrl}/${url}`, options);
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
    }

    get<T>(): Observable<T> {
      return this.apiCall<T>('get','users' );
    }
    
    createUser<T>(body: any): Observable<T> {
      return this.apiCall<T>('post','users/register', body);
    }
    put<T>(body: any): Observable<T> {
      return this.apiCall<T>('put', body);
    }

  connexion<T>(body: any): Observable<T> {
  return this.apiCall<T>('post', 'auth/login', body)};


  }

