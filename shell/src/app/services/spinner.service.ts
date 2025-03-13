import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService implements OnDestroy {
  private _countRequests = 0;
  private _timeoutRef: ReturnType<typeof setTimeout> | null = null;
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  setLoading(isLoading: boolean) {
    if (isLoading) {
      this._countRequests++;
    } else {
      this._countRequests = Math.max(0, this._countRequests - 1);
    }

    if (this._countRequests > 0) {
      if (!this._timeoutRef) {
        this._timeoutRef = setTimeout(() => {
          this._loading.next(true);
        }, 500);
      }
    } else {
      if (this._timeoutRef) {
        clearTimeout(this._timeoutRef);
        this._timeoutRef = null;
      }
      this._loading.next(false);
    }
  }

  ngOnDestroy(): void {
    this._loading.complete();
  }
}
