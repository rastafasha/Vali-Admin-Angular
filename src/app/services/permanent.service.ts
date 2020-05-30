import { Injectable } from '@angular/core';
import { Permanent } from '../models/permanent';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermanentService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPermanents() {
    return this.http.get<Permanent>(this.serverUrl + 'api_permanent/adminPermanents').pipe(
      catchError(this.handleError)
    );
  }

  getPermanent(id: number) {
    return this.http.get<Permanent>(this.serverUrl + 'api_permanent/adminPermanent/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createPermanent(permanent) {
    return this.http.post<any>(this.serverUrl + 'api_permanent/createPermanent/', permanent)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatePermanent(permanent, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_permanent/updatePermanent/' + id, permanent)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePermanent(id: number) {
    return this.http.delete(this.serverUrl + 'api_permanent/deletePermanent/' + id).pipe(
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
