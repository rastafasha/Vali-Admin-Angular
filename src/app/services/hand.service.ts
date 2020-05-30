import { Injectable } from '@angular/core';
import { Hand } from '../models/hand';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHands() {
    return this.http.get<Hand>(this.serverUrl + 'api_hand/adminHands').pipe(
      catchError(this.handleError)
    );
  }

  getHand(id: number) {
    return this.http.get<Hand>(this.serverUrl + 'api_hand/adminHand/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createHand(hand) {
    return this.http.post<any>(this.serverUrl + 'api_hand/createHand/', hand)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateHand(hand, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_hand/updateHand/' + id, hand)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteHand(id: number) {
    return this.http.delete(this.serverUrl + 'api_hand/deleteHand/' + id).pipe(
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
