import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit{
  constructor(public toast: ToastService) {}
  ngOnInit(): void { }
  dismiss(): void {
    this.toast.dismissToast();
  }
}
