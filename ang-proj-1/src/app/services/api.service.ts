import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, catchError, fromEvent, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  get<T>(endpoint: string, params?: any, skipSpinner = false): Observable<T> {
    const messageQueueIndex = Math.random().toString(36).substr(2, 9);
    window.dispatchEvent(
      new CustomEvent('shellGetApi', {
        detail: {
          messageQueueIndex,
          endpoint,
          params,
          skipSpinner,
        },
      })
    );

    return fromEvent(
		window,
		'listenShellGetApi:' + messageQueueIndex
	  ).pipe(
		catchError(this.handleError),
		map((data: any) => {
		  return data.detail.result;
		})
	  );
  }

  post<T>(endpoint: string, data: any, skipSpinner = false): Observable<T> {
    const messageQueueIndex = Math.random().toString(36).substr(2, 9);
    window.dispatchEvent(
      new CustomEvent('shellApi', {
        detail: {
          messageQueueIndex,
          endpoint,
          params: data,
          skipSpinner,
        },
      })
    );
    return fromEvent(window, 'listenShellApi:' + messageQueueIndex).pipe(
      catchError(this.handleError),
      map((data: any) => data.detail.result())
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  private addSkipLoaderHeader(skipLoader: boolean): HttpHeaders {
    return skipLoader
      ? new HttpHeaders({ 'X-Skip-Loader': 'true' })
      : new HttpHeaders();
  }
}
