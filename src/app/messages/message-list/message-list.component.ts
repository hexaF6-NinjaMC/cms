import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @ViewChild('scroll') scroll!: ElementRef;

  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    // this.messageService.scrollToLast();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngAfterViewInit() {
    this.messageService.scrollToLast();
  }
}
