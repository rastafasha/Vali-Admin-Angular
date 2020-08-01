import { Injectable } from '@angular/core';
import { Financing } from '../models/financing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancingService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFinancings() {
    return this.http.get<Financing>(this.serverUrl + 'api_financing/adminFinancings').pipe(
      catchError(this.handleError)
    );
  }

  getFinancing(id: number) {
    return this.http.get<Financing>(this.serverUrl + 'api_financing/adminFinancing/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createFinancing(financing) {
    return this.http.post<any>(this.serverUrl + 'api_financing/createFinancing/', financing)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateFinancing(financing, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_financing/updateFinancing/' + id, financing)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteFinancing(id: number) {
    return this.http.delete(this.serverUrl + 'api_financing/deleteFinancing/' + id).pipe(
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
