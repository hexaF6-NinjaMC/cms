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
  checkboxScriptElement: HTMLScriptElement;
  remainingCharsElement: HTMLScriptElement;
  title = 'cms';

  constructor() {
    this.btnScriptElement = document.createElement('script');
    this.btnScriptElement.src = 'assets/toggleTheme.js';
    document.body.appendChild(this.btnScriptElement);

    this.remainingCharsElement = document.createElement('script');
    this.remainingCharsElement.src = 'assets/checkCharLength.js';
    document.body.appendChild(this.remainingCharsElement);

    this.checkboxScriptElement = document.createElement('script');
    this.checkboxScriptElement.src = 'assets/toggleChecklist.js';
    this.checkboxScriptElement.type = 'module';
    document.body.appendChild(this.checkboxScriptElement);
  }
}
