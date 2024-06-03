import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from '../../win-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow!: Window;
  document!: Document | null;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WinRefService,
  ) {}

  ngOnInit() {
    this.nativeWindow = this.winRef.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
      this.document = this.docService.getDocument(
        params['id'] as number | string,
      );
    });
  }

  onView() {
    if (this.document?.url) this.nativeWindow.open(this.document.url);
  }

  onDelete() {
    this.docService.deleteDocument(this.document || null);
    void this.router.navigate(['../'], { relativeTo: this.route });
  }
}
