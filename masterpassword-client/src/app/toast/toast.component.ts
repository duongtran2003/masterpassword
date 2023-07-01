import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ToastService } from '../toast.service';
import { IToast } from '../IToast';
import {} from '@fortawesome/angular-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(200%)' })),
      transition('* => close', [
        animate('300ms ease-in-out')
      ]),
      transition('* => open', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  @Input() index!: number;
  @Input() newToast!: IToast;
  @Output() destroyToast = new EventEmitter();

  closeIcon = faCircleXmark;
  closeToast = setTimeout(() => {
    this.newToast.state = 'close';
  }, 2200);

  terminateToast = setTimeout(() => {
    this.destroyToast.emit(this.index);
  }, 2500);

  constructor(public toast: ToastService) { }
  ngOnInit(): void {
    this.newToast.state = 'open';
    this.closeToast;
    this.terminateToast;
  }
  dismiss(): void {
    clearTimeout(this.closeToast);
    clearTimeout(this.terminateToast);
    this.newToast.state = 'close';
    setTimeout(() => {
      this.destroyToast.emit(this.index);
    }, 300);
  }
}
