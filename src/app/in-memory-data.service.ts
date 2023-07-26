// in-memory-data.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const messages: Message[] = [
      { id: 1, senderId: 12, text: 'Hello', timestamp: Date.now() },
      { id: 2, senderId: 34, text: 'Hi there!', timestamp: Date.now() },
    ];
    return { messages };
  }
}