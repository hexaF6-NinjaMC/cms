import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Documents } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Documents>();

  documents: Documents[] = [
    new Documents(
      1,
      'CIT 260 - Object Oriented Programming',
      'Program objects to orient themselves!',
      'https://www.fsixninja.dev',
      [],
    ),
    new Documents(
      2,
      'CIT 366 - Full Web Stack Development',
      'Fully stacking the web in our favor, and being MEAN about it!',
      'https://flask-mean.fsixninja.dev',
      [],
    ),
    new Documents(
      3,
      'Galactic Mesmerization',
      'Check out the Milky Way galaxy, with CSS3 animations.',
      'https://www.fsixninja.dev/our-site/html/solar-system.html',
      [],
    ),
    new Documents(
      4,
      'My Links',
      "I'm a developer on the web.",
      'https://www.fsixninja.dev',
      [],
    ),
    new Documents(
      5,
      'A Public Project',
      'My Github profile has many projects, but a few of them are private. However, you can check out some of my public ones, as available!',
      'https://www.github.com/hexaF6-NinjaMC',
      [],
    ),
  ];

  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Documents) {
    this.selectedDocumentEvent.emit(document);
  }
}
