/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact | null;
  contact: Contact | undefined;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  _id!: string;
  emailPattern: RegExp =
    /[a-z0-9](?:(?!.*[.]{2,}))[a-z0-9_!#$%&'*+/=?^`{|}~.-]*?[a-z0-9_!#$%&'*+/=?^`{|}~]*?(?:(?<!\.))(?!\.)@[a-z0-9]+[a-z0-9]*(?:[-a-z0-9.]*?)\.[a-z]{2,}/;
  phonePattern: RegExp = /([2-9]\d{2})(-?)([2-9]\d{2})(-?)(\d{4})/;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = params['id'] as string;
      if (this._id === undefined || this._id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this._id);
      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(
        JSON.stringify(this.originalContact),
      ) as Contact;
      if (
        this.originalContact.group !== null &&
        this.originalContact.group !== undefined
      ) {
        this.groupContacts = this.contact.group!;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts,
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact!, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }

  /* DRAG AND DROP METHODS */
  addToGroup($event: CdkDragDrop<Contact>) {
    const selectedContact: Contact = $event.item.data;
    if (this.isInvalidContact(selectedContact)) return;
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;
    if (this.contact && newContact._id === this.contact._id) return true;
    return this.groupContacts.some((c) =>
      newContact ? newContact._id === c._id : false,
    );
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}
