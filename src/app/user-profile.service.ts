// user-profile.service.ts
import { Injectable } from '@angular/core';
import { UserData } from 'src/app/models/userData';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileData: UserData | undefined;
  private imageUrl: string | undefined;

  setUserProfileData(data: UserData) {
    this.userProfileData = data;
  }

  getUserProfileData(): UserData {
    if (!this.userProfileData) {
      throw new Error('User profile data not set');
    }
    
    return this.userProfileData;
  }

  setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  getImageUrl(): string {
    if (!this.imageUrl) {
      throw new Error('Image url not set');
    }
    
    
    return this.imageUrl;
  }
}
