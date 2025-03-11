import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'mfe2-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
