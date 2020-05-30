import { Injectable } from '@angular/core';
import { Look } from '../models/look';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLooks() {
    return this.http.get<Look>(this.serverUrl + 'api_look/adminLooks').pipe(
      catchError(this.handleError)
    );
  }

  getLook(id: number) {
    return this.http.get<Look>(this.serverUrl + 'api_look/adminLook/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createLook(look) {
    return this.http.post<any>(this.serverUrl + 'api_look/createLook/', look)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateLook(look, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_look/updateLook/' + id, look)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteLook(id: number) {
    return this.http.delete(this.serverUrl + 'api_look/deleteLook/' + id).pipe(
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
