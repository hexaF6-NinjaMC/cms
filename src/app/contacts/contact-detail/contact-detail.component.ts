import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contact: Contact = new Contact(
    9000,
    "Goku",
    "supersayan@gmail.com",
    "123-456-7890",
    "../../../assets/images/goku-san.png",
    null
  );
}
