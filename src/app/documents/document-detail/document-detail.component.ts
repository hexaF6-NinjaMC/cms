import { Component, Input } from '@angular/core';
import { Documents } from '../documents.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent {
  @Input() document!: Documents;
}
