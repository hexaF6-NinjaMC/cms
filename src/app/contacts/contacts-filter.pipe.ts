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

    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}
