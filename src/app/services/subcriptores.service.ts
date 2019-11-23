import { Injectable } from '@angular/core';
import { Subcriptore } from '../models/subcriptore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcriptoreService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSubcriptores() {
    return this.http.get<Subcriptore>(this.serverUrl + 'api/adminSubcriptores').pipe(
      catchError(this.handleError)
    );
  }

  getSubcriptore(id: number) {
    return this.http.get<Subcriptore>(this.serverUrl + 'api/adminSubcriptore/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createSubcriptore(subcriptore) {
    return this.http.post<any>(this.serverUrl + 'api/createSubcriptore/', subcriptore)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSubcriptore(subcriptore, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateSubcriptore/' + id, subcriptore)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteSubcriptore(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteSubcriptore/' + id).pipe(
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
