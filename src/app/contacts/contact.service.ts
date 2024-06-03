import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    /**
     * [FROM: Week 5 assignment instructions]
     * I adjusted this code from the instructions
     * because I felt it was erroneous to have broken
     * contacts of Teams in the SPA.
     */
    // MOCKCONTACTS.forEach((contact) => {
    //   return contact.group === null ? this.contacts.push(contact) : null;
    // });

    /**
     * Otherwise, I would have used the following code.
     * Uncomment the following line to get the instructed behavior.
     */

    /**
     * [ADDED: Before Week 6 assignment instructions]
     * As of 12:46 PM Saturday, June 1, 2024, added functionality to the `contact-list.component.html`
     * to render each contact item in the mock collection, with the addition to the groups.
     */
    this.contacts = MOCKCONTACTS; // <<< Uncomment me!
  }

  getContacts(): Contact[] {
    return this.contacts.slice() || null;
  }

  getContact(id: number | string): Contact | null {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  deleteContact(contact: Contact | null) {
    if (!contact) return;
    const pos: number = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
