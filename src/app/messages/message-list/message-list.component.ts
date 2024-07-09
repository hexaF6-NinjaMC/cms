import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @ViewChild('scroll') scroll!: ElementRef;

  messages: Message[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
  ) {}

  ngOnInit() {
    this.contactService.getContacts();
    setTimeout(() => {
      this.messageService.getMessages();
    }, 100);
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.messageService.scrollToLast();
    }, 200);
  }
}
