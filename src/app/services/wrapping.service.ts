import { Injectable } from '@angular/core';
import { Wrapping } from '../models/wrapping';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WrappingService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWrappings() {
    return this.http.get<Wrapping>(this.serverUrl + 'api/adminWrappings').pipe(
      catchError(this.handleError)
    );
  }

  getWrapping(id: number) {
    return this.http.get<Wrapping>(this.serverUrl + 'api/adminWrapping/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createWrapping(wrapping) {
    return this.http.post<any>(this.serverUrl + 'api/createWrapping/', wrapping)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateWrapping(wrapping, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateWrapping/' + id, wrapping)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteWrapping(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteWrapping/' + id).pipe(
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
