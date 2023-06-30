import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { IPassword } from '../IPassword';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {
  entries: IPassword[] = [];
  constructor(private apiService: ApiServiceService) { }
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
      }
    });
  }
  editRecord(info: IPassword): void {
    this.apiService.put('update', info).subscribe({
      next: (response: IPassword) => {
        for (let entry of this.entries) {
          if (entry.site == response.site && entry.email == response.email) {
            entry.password = response.password;
            break;
          }
        }
      },
      error: (err) => {
        //fire a toast message ( not implemented yet )
      }
    });
  }
  createRecord(info: IPassword): void {
    this.apiService.post('create', info).subscribe({
      next: (response: IPassword) => {
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
        //fire a toast message ( not implemented yet )
      }
    });
  }
  deleteRecord(info: IPassword): void {
    this.apiService.post('delete', info).subscribe({
      next: (response: IPassword) => {
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
        //fire a toast message ( not implemented yet )
      }
    });
  }
}
