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
  constructor (private apiService: ApiServiceService) {}
  errorDesc: string = "";
  ngOnInit(): void {
    this.apiService.get('index').subscribe({
      next: (response: any) => {
        if (!response.length) {
          this.errorDesc = "You don't have any saved password";
        }
        else {
          for (let entry of response) {
            this.entries.push(entry);
          }
        }
      },
      error: (err) => {
        this.errorDesc = "Server Error";
      }
    })
  }
  editRecord(): void {
    console.log("emitted event caught: Edit");
  }
  deleteRecord(): void {
    console.log("emitted event caught: Delete");
  }
}
