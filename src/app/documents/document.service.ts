import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>(); // Removed EventEmitter in favor of Subject subscription.
  documentListChangedEvent = new Subject<Document[]>();
  error = new Subject<string>();

  private documents: Document[] = [];
  private maxDocumentId!: number;
  private documentsUrl =
    'https://angular-fba19-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS; // Week 9 - Using Firebase instead.
    this.maxDocumentId = this.getMaxId(); // Added for Week 7 assignment instructions - Subjects and Subscriptions
  }

  getDocuments(): Document[] {
    console.log('Retrieving documents...');
    this.http.get<Document[]>(this.documentsUrl).subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (+a.id! < +b.id!) return -1;
          if (+a.id! > +b.id!) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice() || null);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Uh, oh! We have an error!', error);
      },
    });
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
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice() || null);
  }

  /**
   * Added getMaxId() method - Week 7
   */
  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
      if (+document.id! > maxId) maxId = +document.id!;
    });
    return maxId;
  }

  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (+a.id! < +b.id!) return -1;
          if (+a.id! > +b.id!) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice() || null);
      });
  }

  /**
   * Added addDocument() method - Week 7
   */
  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) return;
    this.maxDocumentId++;
    newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
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
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
  }
}
