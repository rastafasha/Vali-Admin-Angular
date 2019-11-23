import { Injectable } from '@angular/core';
import { Publicacion } from '../models/publicacion';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPublicacions() {
    return this.http.get<Publicacion>(this.serverUrl + 'api/adminPublicacions').pipe(
      catchError(this.handleError)
    );
  }

  getPublicacion(id: number) {
    return this.http.get<Publicacion>(this.serverUrl + 'api/adminPublicacion/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createPublicacion(publicacion) {
    return this.http.post<any>(this.serverUrl + 'api/createPublicacion/', publicacion)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatePublicacion(publicacion, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updatePublicacion/' + id, publicacion)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePublicacion(id: number) {
    return this.http.delete(this.serverUrl + 'api/deletePublicacion/' + id).pipe(
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
