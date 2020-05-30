import { Injectable } from '@angular/core';
import { Antiage } from '../models/antiage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntiageService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAntiages() {
    return this.http.get<Antiage>(this.serverUrl + 'api_antiages/adminAntiages').pipe(
      catchError(this.handleError)
    );
  }

  getAntiage(id: number) {
    return this.http.get<Antiage>(this.serverUrl + 'api_antiages/adminAntiage/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createAntiage(antiage) {
    return this.http.post<any>(this.serverUrl + 'api_antiages/createAntiage/', antiage)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateAntiage(antiage, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_antiages/updateAntiage/' + id, antiage)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteAntiage(id: number) {
    return this.http.delete(this.serverUrl + 'api_antiages/deleteAntiage/' + id).pipe(
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
