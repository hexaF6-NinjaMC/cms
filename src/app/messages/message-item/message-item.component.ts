import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;

  messageSender?: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.messageSender = this.getSenderName(this.message.sender);
  }

  getSenderName(senderId: string): string {
    // TODO: Fetch the contact's name from the ContactService
    // and return it.
    // This is a placeholder implementation.
    // Replace with actual code when it is resolved.
    // ISSUE: `contacts` is getting reset when router outlets change;
    // therefore, contact.name is `undefined` (hence the 'Unknown Sender').
    return this.contactService.getContact(senderId)?.name || 'Unknown Sender';
  }
}
