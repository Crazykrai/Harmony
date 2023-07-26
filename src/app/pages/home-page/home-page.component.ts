import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
    }
  }

  public friends: UserHarmonyData[] = [];
  inputText: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  AttachID: string = '';
  selectedFriend: string = ''; // To store the selected friend
  ChosenSongID: string = '';
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

  post() {
    // Implement your search functionality here
    console.log('Posting with caption:', this.inputText);
    this.dismissModal(); // Close the modal after performing the search (you can remove this if you want to keep the modal open)
  }

  public getFriends() {
    this.mongoose.getUserFriendData(this.spotify.getCurrentUser().email).subscribe(data => {
      this.friends = data;
      this.ref.detectChanges();
    });
  }


}
