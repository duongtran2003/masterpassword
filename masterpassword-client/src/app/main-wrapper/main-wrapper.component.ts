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
        }
      },
      error: (err) => {
        this.queryError = "Server Error";
      }
    });
  }
  editRecord(info: IPassword): void {
    //supposed to reveal a form to change password. atm just gonna log the info to test the event emitter 
    console.log(info.site);
  }
  deleteRecord(info: IPassword): void {
    this.apiService.post('delete', info).subscribe({
      next: (response: IPassword) => {
        this.fetchEntries();
      },
      error: (err) => {

      }
    })
  }
}
