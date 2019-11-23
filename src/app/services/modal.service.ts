import { Injectable } from '@angular/core';
import { Modal } from '../models/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getModals() {
    return this.http.get<Modal>(this.serverUrl + 'api/adminModals').pipe(
      catchError(this.handleError)
    );
  }

  getModal(id: number) {
    return this.http.get<Modal>(this.serverUrl + 'api/adminModal/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createModal(modal) {
    return this.http.post<any>(this.serverUrl + 'api/createModal/', modal)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateModal(modal, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateModal/' + id, modal)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteModal(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteModal/' + id).pipe(
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
