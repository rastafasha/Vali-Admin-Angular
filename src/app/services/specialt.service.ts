import { Injectable } from '@angular/core';
import { Specialt } from '../models/specialt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSpecialts() {
    return this.http.get<Specialt>(this.serverUrl + 'api/adminSpecialts').pipe(
      catchError(this.handleError)
    );
  }

  getSpecialt(id: number) {
    return this.http.get<Specialt>(this.serverUrl + 'api/adminSpecialt/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createSpecialt(specialt) {
    return this.http.post<any>(this.serverUrl + 'api/createSpecialt/', specialt)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSpecialt(specialt, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateSpecialt/' + id, specialt)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteSpecialt(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteSpecialt/' + id).pipe(
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
