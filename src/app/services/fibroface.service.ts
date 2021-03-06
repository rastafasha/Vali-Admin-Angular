import { Injectable } from '@angular/core';
import { Fibroface } from '../models/fibroface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FibrofaceService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFibrofaces() {
    return this.http.get<Fibroface>(this.serverUrl + 'api_fibroface/adminFibrofaces').pipe(
      catchError(this.handleError)
    );
  }

  getFibroface(id: number) {
    return this.http.get<Fibroface>(this.serverUrl + 'api_fibroface/adminFibroface/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createFibroface(fibrofaceace) {
    return this.http.post<any>(this.serverUrl + 'api_fibroface/createFibroface/', fibrofaceace)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateFibroface(fibrofaceace, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_fibroface/updateFibroface/' + id, fibrofaceace)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteFibroface(id: number) {
    return this.http.delete(this.serverUrl + 'api_fibroface/deleteFibroface/' + id).pipe(
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
