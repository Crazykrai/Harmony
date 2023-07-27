import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyRecommendation } from 'src/app/models/spotifyRecommendation';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-actual-friend-card',
  templateUrl: './actual-friend-card.component.html',
  styleUrls: ['./actual-friend-card.component.css']
})
export class ActualFriendCardComponent {
  @Input() email: string = '';
  @Input() pictureUrl: string | null = null;
  @Input() friendName: string | null = null;
  @Input() smallPicture: boolean = false;


  constructor(private modalService: NgbModal, private spotify: SpotifyService, private mongoose: DatabaseService) {}

  chosenType: string = 'track';
  spotifyQuery: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef

  searchResults: any[] = [];

  chosenItem: any;

  public sendRecommendation() {
    const recommendation: SpotifyRecommendation = {
      spotifyUrl: this.chosenItem.external_urls.spotify,
      spotifyUri: this.chosenItem.uri,
      senderName: this.spotify.getCurrentUser().displayName,
      senderImage: this.spotify.getCurrentUser().imageUrl
    };
    this.mongoose.addRecommendation(recommendation,this.email).subscribe(data => {
      console.log(data, 'Recommendation Sent');
      this.dismissModal();
    });
  }

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
    this.spotify.searchSpotify(this.spotifyQuery,this.chosenType).subscribe(data => {
      console.log(data);
      if(this.chosenType=='track') {
        this.searchResults = data.tracks.items;
      } else if(this.chosenType=='artist') {
        this.searchResults = data.artists.items;
      } else {
        this.searchResults = data.albums.items;
      }
      console.log(this.searchResults);
    });
  }

}
