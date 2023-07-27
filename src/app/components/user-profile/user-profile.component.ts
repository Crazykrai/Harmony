import { ChangeDetectorRef, ViewChild, Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { UserTopArtists, UserTopSongs } from 'src/app/models/userTopItems';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyRecommendation } from 'src/app/models/spotifyRecommendation';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})

export class UserProfileComponent implements OnInit {
  image: string = 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg';
  constructor(private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef, private modalService: NgbModal, private userProfileService: UserProfileService) { }

  chosenType: string = 'track';
  spotifyQuery: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  ChosenSongID: string = '';

  searchResults: any[] = [];

  chosenItem: any;

  ngOnInit() {
    this.spotify.getUserProfile().subscribe(data => this.showUserData(data));
    this.spotify.getUserTopTracks().subscribe(data => this.handleTopTracks(data));
    this.spotify.getUserTopArtists().subscribe(data => this.handleTopArtists(data));
  
    //this.userProfileService.setUserProfileData(data);
    // if(this.userData.imageUrl[1] != null && this.userData.imageUrl[1] != undefined && this.userData.imageUrl[1] != ''){
    //   this.userData.imageUrl = this.userData.imageUrl[1];
    //   this.saveUserData();
    //   this.userProfileService.setImageUrl(this.userData.imageUrl);
    // }
    // else{
    //   console.log('setting image url');
    //   this.userProfileService.setImageUrl(this.image);
    // }
    
  }

  //  inputText: string = '';
  //  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  // modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  

  dismissModal() {
    this.modalRef.dismiss();
  }

  displaySelectedItem(item: any) {
    console.log('displaying selected item');
    console.log(item);
    this.chosenItem = item.value;
    this.spotify.getSpotifyEmbed(item.value.external_urls.spotify).subscribe(data => document.getElementById('searchResult')!.innerHTML = data.html);
  }

  search() {
    // Implement your search functionality here
    console.log('Searching for:', this.spotifyQuery);
    this.spotify.searchSpotify(this.spotifyQuery, this.chosenType).subscribe(data => {
      console.log(data);
      if (this.chosenType == 'track') {
        this.searchResults = data.tracks.items;
      } else if (this.chosenType == 'artist') {
        this.searchResults = data.artists.items;
      } else {
        this.searchResults = data.albums.items;
      }
      console.log(this.searchResults);
    });
  }

  save() {
    /*Insert set and save code here */
    this.modalRef.dismiss();
  }

  

  public favoriteSong: string = '';

  public favoriteArtist: string = '';

  favoriteGenre: string = '';

  public userData: UserHarmonyData = {
    displayName: '',
    email: '',
    imageUrl: '',
    friends: [],
    posts: [],
    recommendations: [],
    topGenre: ''
  };

  private showUserData(data: UserData) {
    this.userData.displayName = data.display_name;
    this.userData.email = data.email;
    if (data.images[1]) {
      this.userData.imageUrl = data.images[1].url;
      // const profileImage = new Image();
      // profileImage.src = data.images[1].url;
      //document.getElementById('profile-picture-container')!.appendChild(profileImage);
      this.ref.detectChanges();
    }
    if(this.userData.imageUrl == ''){
      throw new Error('User profile data not set');
    }
    this.userProfileService.setImageUrl(this.userData.imageUrl);
    this.saveUserData();
  }

  /* public setUserPictureUrl(data: UserData){
    if(data.images[1]){
      this.userData.imageUrl = data.images[1].url;
      this.saveUserData();
    }
    if(this.userData.imageUrl == ''){
      this.userProfileService.setImageUrl(this.imageUrl);
    }
    else{
      this.userProfileService.setImageUrl(this.userData.imageUrl);
    }
    
  } */
  private handleTopTracks(data: UserTopSongs) {
    if (data.items[0]) {
      this.favoriteSong = data.items[0].name;
      this.spotify.getSpotifyEmbed(data.items[0].external_urls.spotify).subscribe(
        data => document.getElementById('fs')!.innerHTML = data.html
      );
    } else {
      this.favoriteSong = 'Error retrieving favorite song'
    }
  }

  private handleTopArtists(data: UserTopArtists) {
    if (data.items[0]) {
      this.favoriteArtist = data.items[0].name;
      this.spotify.getSpotifyEmbed(data.items[0].external_urls.spotify).subscribe(
        data => {
          document.getElementById('fa')!.innerHTML = data.html;
          console.log(data);
        }
      );

      const genres: any = data.items.flatMap(item => item.genres);

      var mf = 1;
      var m = 0;
      for (var i = 0; i < genres.length; i++) {
        for (var j = i; j < genres.length; j++) {
          if (genres[i] == genres[j])
            m++;
          if (mf < m) {
            mf = m;
            this.userData.topGenre = genres[i];
          }
        }
        m = 0;
      }
      this.saveUserData();
    } else {
      this.favoriteArtist = 'Error retrieving favorite artist'
    }
  }

  private saveUserData() {
    if (this.userData.topGenre != '' && this.userData.displayName != '') {
      this.spotify.setCurrentUser(this.userData);
      this.mongoose.createNewUser(this.userData);
    }
  }
  //  inputText: string = '';
  //  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  // modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  openModal() {
    this.modalRef = this.modalService.open(this.modalContent); // Open the modal and store the reference in modalRef

  }
}
