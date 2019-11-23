import { Injectable } from '@angular/core';
import { Luxuring } from '../models/luxury';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LuxuringService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLuxurings() {
    return this.http.get<Luxuring>(this.serverUrl + 'api/adminLuxurings').pipe(
      catchError(this.handleError)
    );
  }

  getLuxuring(id: number) {
    return this.http.get<Luxuring>(this.serverUrl + 'api/adminLuxuring/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createLuxuring(luxuring) {
    return this.http.post<any>(this.serverUrl + 'api/createLuxuring/', luxuring)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateLuxuring(luxuring, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateLuxuring/' + id, luxuring)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteLuxuring(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteLuxuring/' + id).pipe(
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
