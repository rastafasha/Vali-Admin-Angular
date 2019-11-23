import { Injectable } from '@angular/core';
import { Restorative } from '../models/restorative';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestorativeService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRestoratives() {
    return this.http.get<Restorative>(this.serverUrl + 'api/adminRestoratives').pipe(
      catchError(this.handleError)
    );
  }

  getRestorative(id: number) {
    return this.http.get<Restorative>(this.serverUrl + 'api/adminRestorative/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createRestorative(restorative) {
    return this.http.post<any>(this.serverUrl + 'api/createRestorative/', restorative)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateRestorative(restorative, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateRestorative/' + id, restorative)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteRestorative(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteRestorative/' + id).pipe(
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
