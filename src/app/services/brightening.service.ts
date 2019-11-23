import { Injectable } from '@angular/core';
import { Brightening } from '../models/brightening';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrighteningService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBrightenings() {
    return this.http.get<Brightening>(this.serverUrl + 'api/adminBrightenings').pipe(
      catchError(this.handleError)
    );
  }

  getBrightening(id: number) {
    return this.http.get<Brightening>(this.serverUrl + 'api/adminBrightening/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createBrightening(brightening) {
    return this.http.post<any>(this.serverUrl + 'api/createBrightening/', brightening)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBrightening(brightening, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateBrightening/' + id, brightening)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBrightening(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteBrightening/' + id).pipe(
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
