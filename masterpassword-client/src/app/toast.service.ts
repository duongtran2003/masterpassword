import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToast } from './IToast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toastList$: Subject<IToast> = new Subject<IToast>;
  constructor() { }
  makeToast(toast: IToast): void {
    this.toastList$.next(toast);
  }
}
