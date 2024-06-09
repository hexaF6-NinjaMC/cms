import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter<void>();
  subscription!: Subscription; // Added subscription value of Subscription type.

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      // Added subscription value of Subscription type.
      (documents: Document[]) => {
        this.documents = documents;
      },
    );
  }

  ngOnDestroy() {
    // Added subscription destroyable.
    this.subscription.unsubscribe();
  }
}
