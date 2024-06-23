import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string) {
    const filteredContacts: Contact[] = [];
    contacts.forEach((contact) => {
      if (contact.name.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
        filteredContacts.push(contact);
      }
    });
    // if (term && term.trim().length > 0) {
    //   contacts
    //     .filter((contact) =>
    //       contact.name.toLowerCase().includes(term.toLowerCase()),
    //     )
    //     .forEach((contact) => filteredContacts.push(contact));
    // }
    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}
