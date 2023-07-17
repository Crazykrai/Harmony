import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseURL: string = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public createNewUser(data: any) {
    this.http.post(this.baseURL + "/newuser", data).subscribe(data => console.log(data));
  }

  public getUserData(email: string) {
    this.http.get(this.baseURL + '/user/' + email).subscribe(data => console.log(data));
  }
}

