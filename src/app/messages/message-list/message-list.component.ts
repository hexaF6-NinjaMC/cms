import {
  // AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from '../../contacts/contact.service';
// import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit {
  @ViewChild('scroll') scroll!: ElementRef;

  messages: Message[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
  ) {}

  ngOnInit() {
    this.contactService.getContacts();
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    setTimeout(() => {
      this.messageService.scrollToLast();
    }, 25);
    // this.messageService.scrollToLast();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.messageService.scrollToLast();
  //   }, 0);
  // }
}
