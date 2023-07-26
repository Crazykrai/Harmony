import { Component } from '@angular/core';
import { Message } from 'src/app/message.model';
import { MessageService } from 'src/app/message.serivce';
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  newMessage: Message = {
    id: 0, // You can set a proper ID or generate one on the server-side.
    senderId: 1, // Replace with the sender's name or username.
    text: '',
    timestamp: Date.now(),
  };

  constructor(private messageService: MessageService) {}

  sendMessage(): void {
    if (this.newMessage.text.trim() !== '') {
      this.messageService.addMessage(this.newMessage).subscribe(() => {
        this.newMessage.text = ''; // Clear the input field after sending the message.
      });
    }
  }
}