import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recommendations-page',
  templateUrl: './recommendations-page.component.html',
  styleUrls: ['./recommendations-page.component.css']
})
export class RecommendationsPageComponent {
  inputText: string = '';
  @ViewChild('content') modalContent: any; // ViewChild to reference the modal template
  modalRef!: NgbModalRef; // Declare modalRef property of type NgbModalRef
  RecommendedSongID: string = '';
  selectedFriend: string = ''; // To store the selected friend

  friends: string[] = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4']; // Update this array with your list of friends

  constructor(private modalService: NgbModal) {}

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent); // Open the modal and store the reference in modalRef
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  search() {
    // Implement your search functionality here
    console.log('Searching for:', this.inputText);
    console.log('Selected friend:', this.selectedFriend);
    this.dismissModal(); // Close the modal after performing the search (you can remove this if you want to keep the modal open)
  }
}
