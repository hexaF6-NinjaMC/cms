import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    /**
     * I adjusted this code from the instructions
     * because I felt it was erroneous to have broken
     * contacts of Teams in the SPA.
     */
    MOCKCONTACTS.forEach((contact) => {
      return contact.group === null ? this.contacts.push(contact) : null;
    });

    /**
     * Otherwise, I would have used the following code.
     * Uncomment the following line to get the instructed behavior.
     */
    // this.contacts = MOCKCONTACTS; // <<< Uncomment me!
  }

  getContacts(): Contact[] {
    return this.contacts.slice() || null;
  }

  getContact(id: number | string): Contact | null {
    return this.contacts.find((contact) => contact.id === id) || null;
  }
}
