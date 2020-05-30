import { Injectable } from '@angular/core';
import { Calming } from '../models/calming';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalmingService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCalmings() {
    return this.http.get<Calming>(this.serverUrl + 'api_calming/adminCalmings').pipe(
      catchError(this.handleError)
    );
  }

  getCalming(id: number) {
    return this.http.get<Calming>(this.serverUrl + 'api_calming/adminCalming/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createCalming(calming) {
    return this.http.post<any>(this.serverUrl + 'api_calming/createCalming/', calming)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCalming(calming, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_calming/updateCalming/' + id, calming)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCalming(id: number) {
    return this.http.delete(this.serverUrl + 'api_calming/deleteCalming/' + id).pipe(
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
