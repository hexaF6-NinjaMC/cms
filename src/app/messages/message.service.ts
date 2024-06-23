import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES'; // Use Firebase instead
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  private maxMessageId!: number;
  private messagesUrl =
    'https://angular-fba19-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;

    this.messages = [];
    this.maxMessageId = this.getMaxId();
    this.getMessages();
  }

  getMessages(): Message[] {
    console.log('Retrieving messages...');
    this.http.get<Message[]>(this.messagesUrl).subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (+a.id < +b.id) return -1;
          if (+a.id > +b.id) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice() || null);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Uh, oh! We have an error!', error);
      },
    });
    return this.messages.slice() || null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      if (+message.id > maxId) maxId = +message.id;
    });
    return maxId;
  }

  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(() => {
        // this.messages.sort((a, b) => {
        //   if (a < b) return -1;
        //   if (a > b) return 1;
        //   return 0;
        // });
        this.messageChangedEvent.next(this.messages.slice() || null);
      });
  }

  getMessage(id: number | string): Message | null {
    return this.messages.find((message) => message.id === id) || null;
  }

  addMessage(message: Message) {
    if (message === null || message === undefined) return;
    message.id = `${this.maxMessageId}`;
    this.maxMessageId++;
    this.messages.push(message);
    this.storeMessages();
    // this.messageChangedEvent.emit(this.messages.slice());
    setTimeout(() => {
      this.scrollToLast();
    }, 0);
  }

  scrollToLast() {
    const parentElement: Element = document.querySelector(
      '.scrollable.message-display',
    ) as HTMLElement;
    parentElement.scrollTo({
      top: parentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}
