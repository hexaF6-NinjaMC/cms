/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument!: Document;
  document: Document | undefined;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'] as string;
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      const fetchedDocument = this.documentService.getDocument(id);
      if (fetchedDocument === undefined || fetchedDocument === null) {
        return;
      }
      this.originalDocument = fetchedDocument;
      this.editMode = true;
      this.document = JSON.parse(
        JSON.stringify(this.originalDocument),
      ) as Document;
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(value.name, value.url, value.description);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
