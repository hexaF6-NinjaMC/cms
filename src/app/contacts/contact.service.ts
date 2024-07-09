import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private contactsUrl = '/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.contactsUrl)
      .subscribe({
        next: (response) => {
          this.contacts = response.contacts;
          this.storeContacts();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  getContact(id: string): Contact | null {
    // WHY IS THIS SO ANNOYING????????????????????????????
    return this.contacts.find((contact) => contact._id === id) || null;
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos: number = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.contactsUrl}/${contact._id}`)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.contacts.splice(pos, 1);
          this.storeContacts();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  storeContacts() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    newContact._id = '';
    this.http
      .post<{
        message: string;
        contact: Contact;
      }>(this.contactsUrl, newContact, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.contacts.push(response.contact);
          this.storeContacts();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  updateContact(original: Contact, newContact: Contact) {
    if (!newContact || !original) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact._id = original._id;

    this.http
      .put<{
        message: string;
      }>(`${this.contactsUrl}/${original._id}`, newContact, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.contacts[pos] = newContact;
          this.storeContacts();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
