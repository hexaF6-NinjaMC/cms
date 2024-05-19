import { Component, Input } from '@angular/core';
import { Documents } from './documents.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  @Input() selectedDocument!: Documents;
}
