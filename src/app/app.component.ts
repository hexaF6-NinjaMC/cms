import { Component, Input } from '@angular/core';
// import { environment } from './../environments/environment';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @Input() ngSwitch!: string;

  btnScriptElement: HTMLScriptElement;
  title = 'cms';

  constructor() {
    this.btnScriptElement = document.createElement('script');
    this.btnScriptElement.src = 'assets/toggleTheme.js';
    document.body.appendChild(this.btnScriptElement);
  }
}
