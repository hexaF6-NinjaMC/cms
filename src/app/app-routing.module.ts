import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsComponent } from './contacts/contacts.component';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: environment.defaultLandingPage,
    pathMatch: 'full',
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      {
        path: 'new',
        component: DocumentEditComponent,
      },
      {
        path: ':id',
        component: DocumentDetailComponent,
      },
      {
        path: ':id/edit',
        component: DocumentEditComponent,
      },
    ],
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      {
        path: 'new',
        component: ContactEditComponent,
      },
      {
        path: ':id',
        component: ContactDetailComponent,
      },
      {
        path: ':id/edit',
        component: ContactEditComponent,
      },
    ],
  },
  {
    path: 'messages',
    component: MessageListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
