import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private spinner: SpinnerService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		console.log(
			'[Interceptor] LoadingInterceptor',
			req.url,
			req.headers.has('X-Skip-Loader'),
		);
		const skipSpinner = req.headers.has('X-Skip-Loader');
		if (!skipSpinner) {
			this.spinner.setLoading(true);
		}

		return next.handle(req).pipe(
			finalize(() => {
				if (!skipSpinner) {
					this.spinner.setLoading(false);
				}
			}),
		);
	}
}
