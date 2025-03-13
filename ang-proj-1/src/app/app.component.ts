import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe1-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ang-proj-1';
  profile: any = {};
  constructor(private api: ApiService) {}

  me() {
    this.api.get('me').subscribe((data) => {
      this.profile = data;
    });
  }

  inc() {
    window.dispatchEvent(
      new CustomEvent('listeningHub', {
        bubbles: false,
        detail: { text: () => 1 },
      })
    );
  }

  decs() {
    window.dispatchEvent(
      new CustomEvent('listeningHub', {
        bubbles: true,
        detail: { text: () => -1 },
      })
    );
  }
}
