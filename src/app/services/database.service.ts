import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserHarmonyData } from '../models/userHarmonyData';
import { SpotifyRecommendation } from '../models/spotifyRecommendation';
import { Post } from '../models/post';
import { Message } from '../models/message.model';

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
    return this.http.get<UserHarmonyData>(this.baseURL + '/user/' + email);
  }

  public getRecommendedFriends(genre: string) {
    return this.http.get<UserHarmonyData[]>(this.baseURL + '/friends/' + genre);
  }

  public addNewFriend(data: any) {
    return this.http.post(this.baseURL + '/user/friend', data);
  }

  public addRecommendation(recommendation: SpotifyRecommendation, email: string) {
    return this.http.post(this.baseURL + '/user/' + email + '/recommendation', recommendation);
  }

  public getUserFriendData(email: string) {
    return this.http.get<UserHarmonyData[]>(this.baseURL + '/user/friend/' + email);
  }

  public getRecommendations(email: string) {
    return this.http.get<SpotifyRecommendation[]>(this.baseURL + '/user/recommendations/' + email);
  }

  public updateRecommendations(email: string, recommendations: SpotifyRecommendation[]) {
    console.log('Updating recommendations',recommendations);
    this.http.post(this.baseURL + '/user/' + email + '/rec',recommendations).subscribe(data => console.log(data));
  }

  public addPost(post: Post, email: string) {
    return this.http.post(this.baseURL + '/user/' + email + '/post', post);
  }

  public getPosts(email: string) {
    return this.http.get<Post[]>(this.baseURL + '/user/posts/' + email);
  }

  public addMessage(data: Message) {
    return this.http.post(this.baseURL + '/messages/new', data);
  }

  public getMessages(userEmail: string, friendEmail: string) {
    return this.http.get<Message[]>(this.baseURL + '/messages/' + userEmail + '/' + friendEmail);
  }
}

