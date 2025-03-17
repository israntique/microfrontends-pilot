import { Injectable } from '@angular/core';
import { Observable, catchError, fromEvent, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  get<T>(endpoint: string, params?: any, skipSpinner = false): Observable<T> {
    const messageQueueIndex = this.generateMessageQueueIndex();
    try {
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
    } catch (error) {
      console.error('Error dispatching event:', error);
      return this.handleError('Failed to dispatch API request');
    }

    return fromEvent(window, `listenShellGetApi:${messageQueueIndex}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.detail.result)
    );
  }

  post<T>(endpoint: string, data: any, skipSpinner = false): Observable<T> {
    const messageQueueIndex = this.generateMessageQueueIndex();
    try {
      window.dispatchEvent(
        new CustomEvent('shellPostApi', {
          detail: {
            messageQueueIndex,
            endpoint,
            params: data,
            skipSpinner,
          },
        })
      );
    } catch (error) {
      console.error('Error dispatching event:', error);
      return this.handleError('Failed to dispatch API request');
    }

    return fromEvent(window, `listenShellPostApi:${messageQueueIndex}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.detail.result())
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  private generateMessageQueueIndex(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
