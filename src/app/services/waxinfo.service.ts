import { Injectable } from '@angular/core';
import { Waxinfo } from '../models/waxinfo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaxinfoService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWaxinfos() {
    return this.http.get<Waxinfo>(this.serverUrl + 'api_wax/adminWaxinfos').pipe(
      catchError(this.handleError)
    );
  }

  getWaxinfo(id: number) {
    return this.http.get<Waxinfo>(this.serverUrl + 'api_wax/adminWaxinfo/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createWaxinfo(waxinfo) {
    return this.http.post<any>(this.serverUrl + 'api_wax/createWaxinfo/', waxinfo)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateWaxinfo(waxinfo, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_wax/updateWaxinfo/' + id, waxinfo)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteWaxinfo(id: number) {
    return this.http.delete(this.serverUrl + 'api_wax/deleteWaxinfo/' + id).pipe(
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
