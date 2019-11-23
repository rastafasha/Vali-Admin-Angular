import { Injectable } from '@angular/core';
import { Body } from '../models/body';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBodys() {
    return this.http.get<Body>(this.serverUrl + 'api/adminBodys').pipe(
      catchError(this.handleError)
    );
  }

  getBody(id: number) {
    return this.http.get<Body>(this.serverUrl + 'api/adminBody/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createBody(body) {
    return this.http.post<any>(this.serverUrl + 'api/createBody/', body)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBody(body, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateBody/' + id, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBody(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteBody/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
