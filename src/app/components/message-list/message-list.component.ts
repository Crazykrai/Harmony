
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/message.model';
import { MessageService } from 'src/app/message.serivce';
import {Friend} from 'src/app/friend.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  userProfilePictureUrl: string = ''; // Initialize the user profile picture URL

  constructor(private userProfileService: UserProfileService) {}
  ngOnInit() {
    // Get the user profile picture URL from the query parameters
    this.userProfilePictureUrl = this.userProfileService.getImageUrl();
  }
 
  // check if userProfilePictureUrl is empty if so print no image on to console
  checkImage() {
    if (this.userProfilePictureUrl === '') {
      console.log('No image');
    }
  }
  friends: Friend[] = [
    { id: 2, name: 'Nancy', pictureUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg'},
    { id: 3, name: 'Robert', pictureUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg' },
    { id: 4, name: 'Tony', pictureUrl:'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0='},
  ];
  messages: Message[] = [
    { id: 1, senderId: 1, text: 'Hi there!', timestamp: Date.now() },
    { id: 2, senderId: 1, text: 'How are you?', timestamp: Date.now() + 1000 },
    { id: 3, senderId: 2, text: 'Hello!', timestamp: Date.now() + 2000 },
    { id: 4, senderId: 2, text: 'I am doing great!', timestamp: Date.now() + 3000 },
    { id: 5, senderId: 1, text: 'That sounds good!', timestamp: Date.now() + 4000 },
  ];

  selectedFriend: Friend | null = null;
  messageText: string = '';
  // Function to set the selected friend
  onSelectFriend(friend: Friend): void {
    this.selectedFriend = friend;
  }

  // Function to get messages between the user (senderId = 1) and the selected friend
  getMessagesWithSelectedFriend(): Message[] {
    if (this.selectedFriend) {
      return this.messages.filter(message => message.senderId === 1 || message.senderId === this.selectedFriend?.id);
    }
    return [];
  }
  onSendMessage(): void {
    if (this.messageText.trim() !== '' && this.selectedFriend) {
      const newMessage: Message = {
        id: this.messages.length + 1,
        senderId: 1, // Assuming the sender is the user with ID 1
        text: this.messageText,
        timestamp: Date.now(),
      };
      this.messages.push(newMessage);
      this.messageText = '';
    }
  }
  /* ngOnInit(): void {
      
  } */
}