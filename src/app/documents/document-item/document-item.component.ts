import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Documents } from '../documents.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})
export class DocumentItemComponent implements OnInit {
  @Input() documentItem!: Documents;
  @Output() documentSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.documentSelected.emit();
  }
}
