import { Injectable } from '@angular/core';
import { Bridal } from '../models/bridal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BridalService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBridals() {
    return this.http.get<Bridal>(this.serverUrl + 'api/adminBridals').pipe(
      catchError(this.handleError)
    );
  }

  getBridal(id: number) {
    return this.http.get<Bridal>(this.serverUrl + 'api/adminBridal/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createBridal(bridal) {
    return this.http.post<any>(this.serverUrl + 'api/createBridal/', bridal)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBridal(bridal, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateBridal/' + id, bridal)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBridal(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteBridal/' + id).pipe(
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
