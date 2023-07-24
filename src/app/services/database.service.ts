import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserHarmonyData } from '../models/userHarmonyData';

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
    this.http.get<UserHarmonyData>(this.baseURL + '/user/' + email).subscribe(data => console.log(data));
  }

  public getRecommendedFriends(genre: string) {
    return this.http.get<UserHarmonyData[]>(this.baseURL + '/friends/' + genre);
  }

  public addNewFriend(data: any) {
    return this.http.post(this.baseURL + '/user/friend', data);
  }
}

