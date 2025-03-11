import { Component } from '@angular/core';

@Component({
  selector: 'mfe2-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ang-proj-1';

  inc(){
    window.dispatchEvent(
      new CustomEvent("listeningHub", {
        bubbles: false,
        detail: { text: () => 1 },
      }),
    );
  }

  decs() {
    window.dispatchEvent(
      new CustomEvent("listeningHub", {
        bubbles: true,
        detail: { text: () => -1 },
      }),
    );
  }
}
