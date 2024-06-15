import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice() || null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.scrollToLast();
  }

  getMessage(id: number | string): Message | null {
    return this.messages.find((message) => message.id === id) || null;
  }

  scrollToLast() {
    setTimeout(() => {
      const parentElement: Element = document.querySelector(
        '.scrollable',
      ) as Element;
      // parentElement.scrollTo(0, parentElement.scrollHeight);
      parentElement.scrollTo({
        top: parentElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }
}
