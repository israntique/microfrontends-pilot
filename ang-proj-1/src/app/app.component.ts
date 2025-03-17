import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ang-proj-1';
  profile: any = {};
  constructor(private router: Router) {
    this.connectRouter();
  }

  private connectRouter(useHash = false): void {
    let url: string;
    if (!useHash) {
      url = `${location.pathname.substring(1)}${location.search}`;
      this.router.navigateByUrl(url);
      window.addEventListener('popstate', () => {
        this.router.navigateByUrl(url);
      });
    } else {
      url = `${location.hash.substring(1)}${location.search}`;
      this.router.navigateByUrl(url);
      window.addEventListener('hashchange', () => {
        this.router.navigateByUrl(url);
      });
    }
  }
}
