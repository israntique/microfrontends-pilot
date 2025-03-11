import { Component } from '@angular/core';

@Component({
  selector: 'app-root1',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ang-proj-2';

  constructor() {}

  inc() {
    window.dispatchEvent(
      new CustomEvent('listeningHub', {
        bubbles: false,
        detail: { text: () => 5 },
      })
    );
  }

  decs() {
    window.dispatchEvent(
      new CustomEvent('listeningHub', {
        bubbles: true,
        detail: { text: () => -5 },
      })
    );
  }
}
