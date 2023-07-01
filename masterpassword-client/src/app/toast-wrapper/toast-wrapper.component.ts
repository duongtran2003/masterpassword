import { Component, OnInit } from '@angular/core';
import { IToast } from '../IToast';
import { ToastService } from '../toast.service'

@Component({
  selector: 'app-toast-wrapper',
  templateUrl: './toast-wrapper.component.html',
  styleUrls: ['./toast-wrapper.component.css']
})
export class ToastWrapperComponent implements OnInit {
  toastList: IToast[] = [];
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastList$.subscribe({
      next: (newToast: IToast) => {
        this.toastList.unshift(newToast);
      }
    })
  }
  onDestroyToast(index: number): void {
    this.toastList.splice(index, 1);
  }
}
