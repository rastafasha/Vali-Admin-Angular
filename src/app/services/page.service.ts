import { Injectable } from '@angular/core';
import { Page } from '../models/page';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPages() {
    return this.http.get<Page>(this.serverUrl + 'api_pages/adminPages').pipe(
      catchError(this.handleError)
    );
  }

  getMemberships() {
    return this.http.get<Page>(this.serverUrl + 'api_pages/adminMemberships').pipe(
      catchError(this.handleError)
    );
  }

  getMembership(id: number) {
    return this.http.get<Page>(this.serverUrl + 'api_pages/adminMembership/' + id).pipe(
      catchError(this.handleError)
    );
  }

  updateMembership(membership, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_pages/updateMembership/' + id, membership)
    .pipe(
      catchError(this.handleError)
    );
  }


  // franchise

  getFranchises() {
    return this.http.get<Page>(this.serverUrl + 'api_pages/adminFranchises').pipe(
      catchError(this.handleError)
    );
  }

  getFranchise(id: number) {
    return this.http.get<Page>(this.serverUrl + 'api_pages/adminFranchise/' + id).pipe(
      catchError(this.handleError)
    );
  }

  updateFranchise(franchise, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_pages/updateFranchise/' + id, franchise)
    .pipe(
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
