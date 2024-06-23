import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS'; // Week 9 - Use Firebase instead
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>(); // Removed EventEmitter in favor of Subject subscription.
  contactListChangedEvent = new Subject<Contact[]>();
  error = new Subject<string>();

  private contacts: Contact[] = [];
  private maxContactId!: number;
  private contactsUrl =
    'https://angular-fba19-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {
    // /**
    //  * [FROM: Week 5 assignment instructions]
    //  * I adjusted this code from the instructions
    //  * because I felt it was erroneous to have broken
    //  * contacts of Teams in the SPA.
    //  */
    // // MOCKCONTACTS.forEach((contact) => {
    // //   return contact.group === null ? this.contacts.push(contact) : null;
    // // });

    // /**
    //  * Otherwise, I would have used the following code.
    //  * Uncomment the following line to get the instructed behavior.
    //  */

    // /**
    //  * [ADDED: Before Week 6 assignment instructions]
    //  * As of 12:46 PM Saturday, June 1, 2024, added functionality to the `contact-list.component.html`
    //  * to render each contact item in the mock collection, with the addition to the groups.
    //  */
    // this.contacts = MOCKCONTACTS; // <<< Uncomment me! // <<< Removed for Firebase functionality.
    this.maxContactId = this.getMaxId(); // Added for Week 7 assignment instructions - Subjects and Subscriptions
  }

  getContacts(): Contact[] {
    console.log('Getting contacts...');
    this.http.get<Contact[]>(this.contactsUrl).subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (+a.id < +b.id) return -1;
          if (+a.id > +b.id) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice() || null);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Uh, oh! We have an error!', error);
      },
    });
    return this.contacts.slice() || null;
  }

  getContact(id: string): Contact | null {
    return this.contacts.find((c) => c.id === id) || null;
  }

  /**
   * Edited deleteContact() method - Week 7
   * Changed 'emit()' method to 'next()' method
   * to align with Subjects subscriptions.
   */
  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos: number = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
    // this.contactListChangedEvent.next(this.contacts.slice());
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

  storeContacts() {
    this.http
      .put(this.contactsUrl, JSON.stringify(this.contacts), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(() => {
        this.contacts.sort((a, b) => {
          if (+a.id < +b.id) return -1;
          if (+a.id > +b.id) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice() || null);
      });
  }

  /**
   * Added addContact() method - Week 7
   */
  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) return;
    this.maxContactId++;
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    this.storeContacts();
    // this.contactListChangedEvent.next(this.contacts.slice());
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
    this.storeContacts();
    // this.contactListChangedEvent.next(this.contacts.slice());
  }
}
