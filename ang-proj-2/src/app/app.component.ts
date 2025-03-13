import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'mfe2-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ang-proj-2';
  userGroup: any = null;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("mfe2. query params:", params);
    });
  }

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

  getGroups() {
    this.api.get('me/appRoleAssignments').subscribe((data) => {
      this.userGroup = data;
    });
  }
}
