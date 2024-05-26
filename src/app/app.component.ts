import { Component, Input } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @Input() ngSwitch!: string;
  title = 'cms';

  selectedFeature: string = environment.defaultLandingPage || 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
