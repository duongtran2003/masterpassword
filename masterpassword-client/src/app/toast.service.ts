import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const TOAST_STATE = {
  default: 'toastr',
  success: 'toastr-success',
  warning: 'toastr-warning',
  danger: 'toastr-failed',
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showsToastObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toastMsgObs: BehaviorSubject<string> = new BehaviorSubject<string>("Default");
  public toastStateObs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([TOAST_STATE.default, TOAST_STATE.success]);
  constructor() { }
  showToast(toastState: string[], toastMsg: string): void {
    this.toastStateObs.next(toastState);
    this.toastMsgObs.next(toastMsg);
    this.showsToastObs.next(true);
    setTimeout(() => {
      this.dismissToast();
    }, 2000);
  }
  dismissToast(): void {
    this.showsToastObs.next(false);
  }
}
