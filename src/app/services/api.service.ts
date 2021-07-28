import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://theraponto.dev.thera.com.br:8088';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  onLogin(item): Observable<Login> {
    return this.http
      .post<Login>(this.base_path + '/api/Accounts', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTimesheep(): Observable<any> {
    return this.http
      .get<any>(this.base_path + '/api/Timesheet')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createTimesheep(item): Observable<Login> {
    return this.http
      .post<Login>(this.base_path + '/api/Timesheet', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTimesheep(id, item): Observable<Timesheep> {
    return this.http
      .put<Timesheep>(this.base_path + '/api/Timesheet' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteTimesheep(id) {
    return this.http
      .delete<any>(this.base_path + '/api/Timesheet' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}


export class Login {
  id: number;
  name: string;
  age: string;
  address: string;
}

export class Timesheep{

}
