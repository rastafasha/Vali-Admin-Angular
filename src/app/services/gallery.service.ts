import { Injectable } from '@angular/core';
import { Gallery } from '../models/gallery';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGallerys() {
    return this.http.get<Gallery>(this.serverUrl + 'api/adminGallerys').pipe(
      catchError(this.handleError)
    );
  }

  getGallery(id: number) {
    return this.http.get<Gallery>(this.serverUrl + 'api/adminGallery/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createGallery(gallery) {
    return this.http.post<any>(this.serverUrl + 'api/createGallery/', gallery)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateGallery(gallery, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateGallery/' + id, gallery)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteGallery(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteGallery/' + id).pipe(
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
