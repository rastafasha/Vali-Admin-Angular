import { Injectable } from '@angular/core';
import { Wax } from '../models/wax';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaxService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWaxs() {
    return this.http.get<Wax>(this.serverUrl + 'api/adminWaxs').pipe(
      catchError(this.handleError)
    );
  }

  getWax(id: number) {
    return this.http.get<Wax>(this.serverUrl + 'api/adminWax/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createWax(wax) {
    return this.http.post<any>(this.serverUrl + 'api/createWax/', wax)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateWax(wax, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateWax/' + id, wax)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteWax(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteWax/' + id).pipe(
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
