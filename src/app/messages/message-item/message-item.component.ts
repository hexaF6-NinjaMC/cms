import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

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
    const contact = this.contactService.getContact(
      this.message.sender,
    ) as Contact;

    /**
     * The below commented `if-else` code
     * is the elongated example of the
     * ternary operator below it.
     *
     * This allows us to use a default sender name
     * as previously defined in
     * `message-edit.component.ts`.
     */

    // if (!contact) {
    //   this.messageSender = this.message.sender;
    // } else {
    //   this.messageSender = contact.name;
    // }

    this.messageSender = contact === null ? this.message.sender : contact.name;
  }
}
