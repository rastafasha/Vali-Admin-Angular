import { Injectable } from '@angular/core';
import { Hypertrophic } from '../models/hypertrophic';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HypertrophicService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHypertrophics() {
    return this.http.get<Hypertrophic>(this.serverUrl + 'api/adminHypertrophics').pipe(
      catchError(this.handleError)
    );
  }

  getHypertrophic(id: number) {
    return this.http.get<Hypertrophic>(this.serverUrl + 'api/adminHypertrophic/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createHypertrophic(hypertrophic) {
    return this.http.post<any>(this.serverUrl + 'api/createHypertrophic/', hypertrophic)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateHypertrophic(hypertrophic, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateHypertrophic/' + id, hypertrophic)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteHypertrophic(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteHypertrophic/' + id).pipe(
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
