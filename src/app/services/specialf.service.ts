import { Injectable } from '@angular/core';
import { Specialf } from '../models/specialf';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialfService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSpecialfs() {
    return this.http.get<Specialf>(this.serverUrl + 'api/adminSpecialfs').pipe(
      catchError(this.handleError)
    );
  }

  getSpecialf(id: number) {
    return this.http.get<Specialf>(this.serverUrl + 'api/adminSpecialf/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createSpecialf(specialf) {
    return this.http.post<any>(this.serverUrl + 'api/createSpecialf/', specialf)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSpecialf(specialf, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateSpecialf/' + id, specialf)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteSpecialf(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteSpecialf/' + id).pipe(
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
