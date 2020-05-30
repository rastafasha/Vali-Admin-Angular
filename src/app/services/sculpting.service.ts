import { Injectable } from '@angular/core';
import { Sculpting } from '../models/sculpting';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SculptingService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSculptings() {
    return this.http.get<Sculpting>(this.serverUrl + 'api_sculpting/adminSculptings').pipe(
      catchError(this.handleError)
    );
  }

  getSculpting(id: number) {
    return this.http.get<Sculpting>(this.serverUrl + 'api_sculpting/adminSculpting/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createSculpting(sculpting) {
    return this.http.post<any>(this.serverUrl + 'api_sculpting/createSculpting/', sculpting)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSculpting(sculpting, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_sculpting/updateSculpting/' + id, sculpting)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteSculpting(id: number) {
    return this.http.delete(this.serverUrl + 'api_sculpting/deleteSculpting/' + id).pipe(
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
