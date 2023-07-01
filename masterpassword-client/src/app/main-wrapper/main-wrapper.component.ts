import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { IPassword } from '../IPassword';
import { Observable } from 'rxjs';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {
  entries: IPassword[] = [];
  constructor(private apiService: ApiServiceService, private toastService: ToastService) { }
  queryError: string = "";
  ngOnInit(): void {
    this.fetchEntries();
  }
  sortEntries() {
    this.entries.sort((a: IPassword, b: IPassword): number => {
      if (a.site < b.site) {
        return -1;
      }
      if (a.site > b.site) {
        return 1;
      }
      return 0;
    });
  }
  fetchEntries(): void {
    this.apiService.get('index').subscribe({
      next: (response: IPassword[]) => {
        if (!response.length) {
          this.queryError = "You don't have any saved password";
        }
        else {
          for (let entry of response) {
            this.entries.push(entry);
          }
          this.sortEntries();
        }
      },
      error: (err) => {
        this.queryError = "Server Error";
        this.toastService.makeToast({
          state: "close",
          message: "Query Error",
          barClass: ['bg-red-600'],
        })
      }
    });
  }
  editRecord(info: IPassword): void {
    this.apiService.put('update', info).subscribe({
      next: (response: IPassword) => {
        this.toastService.makeToast({
          state: "close",
          message: "Record edited",
          barClass: ['bg-green-600'],
        })
        for (let entry of this.entries) {
          if (entry.site == response.site && entry.email == response.email) {
            entry.password = response.password;
            break;
          }
        }
      },
      error: (err) => {
        this.toastService.makeToast({
          state: 'close',
          message: "Server error",
          barClass: ['bg-red-600'],
        })
      }
    });
  }
  createRecord(info: IPassword): void {
    this.apiService.post('create', info).subscribe({
      next: (response: IPassword) => {
        this.toastService.makeToast({
          state: "close",
          message: "Record added",
          barClass: ['bg-green-600'],
        })
        let inserted: boolean = false;
        for (let i = 0; i < this.entries.length; i++) {
          if (this.entries[i].site == response.site) {
            inserted = true;
            this.entries.splice(i, 0, response);
            break;
          }
        }
        if (!inserted) {
          this.entries.push(response);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status == 500) {
          this.toastService.makeToast({
            state: 'close',
            message: 'Server error',
            barClass: ['bg-red-600'],
          })
        }
        if (err.status == 409) {
          this.toastService.makeToast({
            state: 'close',
            message: 'Duplicate. Creation aborted',
            barClass: ['bg-yellow-400'],
          })
        }
      }
    });
  }
  deleteRecord(info: IPassword): void {
    this.apiService.post('delete', info).subscribe({
      next: (response: IPassword) => {
        this.toastService.makeToast({
          state: 'close',
          message: 'Record deleted',
          barClass: ['bg-green-600'],
        })
        for (let i = 0; i < this.entries.length; i++) {
          if (this.entries[i].site == response.site && this.entries[i].email == response.email) {
            this.entries.splice(i, 1);
            break;
          }
        }
        if (!this.entries.length) {
          this.queryError = "You don't have any saved password";
        }
      },
      error: (err) => {
        this.toastService.makeToast({
          state: 'close',
          message: 'Server error',
          barClass: ['bg-red-600'],
        })
      }
    });
  }
}
