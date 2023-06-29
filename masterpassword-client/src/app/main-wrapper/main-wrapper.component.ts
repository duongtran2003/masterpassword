import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {
  fakeInfo: {
    site: string,
    email: string,
    password: string,
  }[] = [
    {
      site: "pornhub",
      email: "dt1@ph.gov",
      password: "12345678",
    },
    {
      site: "xvideos",
      email: "dt1@xv.gov",
      password: "987654321",
    },
    {
      site: "redtube",
      email: "dt1@rt.gov",
      password: "456123789",
    }
  ]
  ngOnInit(): void {
    
  }
  editRecord(email: string): void {
    console.log("emitted event caught: Edit " + email);
  }
  deleteRecord(email: string): void {
    console.log("emitted event caught: Delete " + email);
  }
}
