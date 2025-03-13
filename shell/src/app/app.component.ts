import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { fromEvent } from 'rxjs';
import { ApiService } from './services/api.service';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  title = 'shell';
  counter = 0;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private api: ApiService
  ) {
    fromEvent(window, 'listeningHub').subscribe((data: any) => {
      this.counter = this.counter + data.detail.text();
    });
  }

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe((data) => {
      console.log('handleRedirectObservable', data);
    });
  }

  fetchProfile() {
    this.api.get('me').subscribe((data) => {
      console.log(data);
    });
  }
}
