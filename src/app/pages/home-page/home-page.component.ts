import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private modalService: NgbModal, private spotify: SpotifyService, private mongoose: DatabaseService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.spotify.isAuthorized()) {
      this.router.navigate(['']);
    } else {
      this.getFriends();
      this.mongoose.getPosts(this.spotify.getCurrentUser().email).subscribe(data => {
        this.posts = data.sort((objA, objB) => new Date(objB.datePosted).getTime() - new Date(objA.datePosted).getTime());
      });
    }
  }

  public friends: UserHarmonyData[] = [];
  public posts: Post[] = []
  inputText: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  chosenType: string = 'track';
  spotifyQuery: string = '';
  searchResults: any[] = [];

  chosenItem: any;

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent); // Open the modal and store the reference in modalRef
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  displaySelectedItem(item: any) {
    console.log('displaying selected item');
    console.log(item);
    this.chosenItem = item.value;
    this.spotify.getSpotifyEmbed(item.value.external_urls.spotify).subscribe(data => document.getElementById('postSearchResult')!.innerHTML = data.html);
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

  post() {
    // Implement your search functionality here
    console.log('Posting with caption:', this.inputText);
    const user = this.spotify.getCurrentUser();
    const postContent: Post = {
      name: user.displayName,
      attachmentUrl: this.chosenItem.external_urls.spotify,
      bodyText: this.inputText,
      profileImageUrl: user.imageUrl,
      datePosted: new Date()
    };
    this.mongoose.addPost(postContent, user.email).subscribe(data => {
      console.log(data, 'Post sent');
      this.mongoose.getPosts(this.spotify.getCurrentUser().email).subscribe(data => {
        this.posts = data.sort((objA, objB) => new Date(objB.datePosted).getTime() - new Date(objA.datePosted).getTime());
        this.ref.detectChanges();
        this.dismissModal();
      });
    });
  }

  public getFriends() {
    this.mongoose.getUserFriendData(this.spotify.getCurrentUser().email).subscribe(data => {
      this.friends = data;
      this.ref.detectChanges();
    });
  }


}
