import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyRecommendation } from 'src/app/models/spotifyRecommendation';
import { UserPlaylists } from 'src/app/models/userPlaylists';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.css']
})
export class RecommendationCardComponent {
  @Input() recommendation: SpotifyRecommendation = {
    spotifyUrl: '',
    spotifyUri: '',
    senderImage: '',
    senderName: ''
  };
  @Input() i: any;
  

  constructor(private modalService: NgbModal,  private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef) {}

  playlists: UserPlaylists = {
    items: []
  };

  chosenPlaylist: any;
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef

  addToPlaylist(): void {
    // Handle the "Add Friend" button click event here
    this.spotify.addtoPlaylist(this.chosenPlaylist.id,this.recommendation.spotifyUri).subscribe(data => {
      console.log(data, 'Added to Playlist!');
      this.dismissModal();
    });
  }

  ngOnInit() {
    //this.spotify.getUserTopTracks().subscribe(data => this.handleTopTracks(data));
    this.spotify.getSpotifyEmbed(this.recommendation.spotifyUrl).subscribe(
      data => document.getElementById(this.i)!.innerHTML = data.html
    );
    this.spotify.getUserPlaylists().subscribe(data => this.playlists = data)
  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent); // Open the modal and store the reference in modalRef
  }

  dismissModal() {
    this.modalRef.dismiss();
  }
}

