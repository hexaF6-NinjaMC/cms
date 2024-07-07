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
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl = 'http://localhost:3000/documents';
  private documents: Document[] = [];

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      .subscribe({
        next: (response) => {
          this.documents = response.documents;
          this.storeDocuments();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  getDocument(id: string): Document | null {
    return this.documents.find((document) => document._id === id) || null;
  }

  deleteDocument(document: Document | null) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.documentsUrl}/${document._id}`)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.documents.splice(pos, 1);
          this.storeDocuments();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  storeDocuments() {
    this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    newDocument._id = '';
    this.http
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDocument,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        },
      )
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.documents.push(response.document);
          this.storeDocuments();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  updateDocument(original: Document, newDocument: Document) {
    if (!newDocument || !original) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDocument._id = original._id;

    this.http
      .put<{
        message: string;
      }>(`${this.documentsUrl}/${original._id}`, newDocument, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.documents[pos] = newDocument;
          this.storeDocuments();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
