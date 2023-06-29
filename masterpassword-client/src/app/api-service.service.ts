import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPassword } from './IPassword';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl: string = "http://localhost:8000/password/";
  constructor(private http: HttpClient) { }
  get(endpoint: string): Observable<IPassword[]> {
    const url: string = this.apiUrl + endpoint;
    return this.http.get<IPassword[]>(url);
  }
  post(endpoint: string, reqBody: IPassword): Observable<IPassword> {
    const url: string = this.apiUrl + endpoint;
    return this.http.post<IPassword>(url, reqBody);
  }
  put(endpoint: string, reqBody: IPassword): Observable<IPassword> {
    const url: string = this.apiUrl + endpoint;
    return this.http.put<IPassword>(url, reqBody);
  }
}
