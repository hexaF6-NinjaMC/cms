import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>(); // Removed EventEmitter in favor of Subject subscription.
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId!: number;

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
    this.maxContactId = this.getMaxId(); // Added for Week 7 assignment instructions - Subjects and Subscriptions
  }

  getContacts(): Contact[] {
    return this.contacts.slice() || null;
  }

  getContact(id: number | string): Contact | null {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  /**
   * Edited deleteContact() method - Week 7
   * Changed 'emit()' method to 'next()' method
   * to align with Subjects subscriptions.
   */
  deleteContact(contact: Contact | null) {
    if (!contact) return;
    const pos: number = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  /**
   * Added getMaxId() method - Week 7
   */
  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      if (+contact.id > maxId) maxId = +contact.id;
    });
    return maxId;
  }

  /**
   * Added addContact() method - Week 7
   */
  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) return;
    this.maxContactId++;
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  /**
   * Added updateContact() method - Week 7
   */
  updateContact(original: Contact, newContact: Contact) {
    if (
      newContact === null ||
      newContact === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
