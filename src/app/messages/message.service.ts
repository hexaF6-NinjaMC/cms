import { Injectable } from '@angular/core';
import { Message } from './message.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string; messageObjs: Message[] }>(this.messagesUrl)
      .subscribe({
        next: (res) => {
          this.messages = res.messageObjs;
          this.storeMessages();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  storeMessages() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessage(id: string): Message | null {
    return this.messages.find((message) => message._id === id) || null;
  }

  addMessage(newMsg: Message) {
    if (!newMsg) return;
    newMsg._id = '';
    this.http
      .post<{
        message: string;
        messageObj: Message;
      }>(this.messagesUrl, newMsg, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.messages.push(response.messageObj);
          this.storeMessages();

          setTimeout(() => {
            this.scrollToLast();
          }, 0);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  scrollToLast() {
    const parentElement = document.querySelector('.scrollable.message-display');
    if (parentElement) {
      parentElement.scrollTo({
        top: parentElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
