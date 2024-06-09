import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>(); // Removed EventEmitter in favor of Subject subscription.
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId!: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId(); // Added for Week 7 assignment instructions - Subjects and Subscriptions
  }

  getDocuments(): Document[] {
    return this.documents.slice() || null;
  }

  getDocument(id: number | string): Document | null {
    return this.documents.find((document) => document.id === id) || null;
  }

  /**
   * Edited deleteDocument() method - Week 7
   * Changed 'emit()' method to 'next()' method
   * to align with Subjects subscriptions.
   */
  deleteDocument(document: Document | null) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice() || null);
    // console.log('ngOnDestroy method invoked.');
  }

  /**
   * Added getMaxId() method - Week 7
   */
  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
      if (+document.id > maxId) maxId = +document.id;
      // console.log('Document ID:', +document.id);
    });
    return maxId;
  }

  /**
   * Added addDocument() method - Week 7
   */
  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) return;
    this.maxDocumentId++;
    newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  /**
   * Added updateDocument() method - Week 7
   */
  updateDocument(original: Document, newDocument: Document) {
    if (
      newDocument === null ||
      newDocument === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDocument.id = original.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
