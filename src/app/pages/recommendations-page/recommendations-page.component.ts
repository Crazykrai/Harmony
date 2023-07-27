import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recommendations-page',
  templateUrl: './recommendations-page.component.html',
  styleUrls: ['./recommendations-page.component.css']
})
export class RecommendationsPageComponent implements OnInit {
  inputText: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  RecommendedSongID: string = '';
  selectedFriend: string = ''; // To store the selected friend
  ChosenSongID: string = '';
  chosenType: string = 'track';
  spotifyQuery: string = '';
  searchResults: any[] = [];

  chosenItem: any;

  friends: string[] = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4']; // Update this array with your list of friends

  constructor(private spotify: SpotifyService, private modalService: NgbModal, private router: Router) { }
  ngOnInit(): void {
    if (!this.spotify.isAuthorized()) {
      this.router.navigate(['']);
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent); // Open the modal and store the reference in modalRef
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  searchFriend() {
    // Implement your search functionality here
    console.log('Searching for:', this.inputText);
    console.log('Selected friend:', this.selectedFriend);
    this.dismissModal(); // Close the modal after performing the search (you can remove this if you want to keep the modal open)
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

  public sendRecommendation() {
    /*Code for sending a recommendation */
    this.modalRef.dismiss();
  }
}
