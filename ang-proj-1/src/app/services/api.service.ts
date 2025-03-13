import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private baseUrl = "https://graph.microsoft.com/v1.0/";

	constructor(private http: HttpClient) {}

	get<T>(endpoint: string, params?: any, skipSpinner = false): Observable<T> {
		return this.http
			.get<T>(`${this.baseUrl}/${endpoint}`, {
				params,
				headers: this.addSkipLoaderHeader(skipSpinner),
			})
			.pipe(catchError(this.handleError));
	}

	post<T>(endpoint: string, data: any, skipSpinner = false): Observable<T> {
		return this.http
			.post<T>(`${this.baseUrl}/${endpoint}`, data, {
				headers: this.addSkipLoaderHeader(skipSpinner),
			})
			.pipe(catchError(this.handleError));
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
