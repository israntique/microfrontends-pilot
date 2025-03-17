import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@softarc/native-federation-runtime';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IWrapperConfig } from './constants/wrapper.config';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  elm = inject(ElementRef);
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    if (this.route.snapshot.data['config']) {
      const config = this.route.snapshot.data['config'] as IWrapperConfig;
      await this.injectRemoteModule(config);
    }
  }

  private async injectRemoteModule(config: IWrapperConfig) {
    const { exposedModule, remoteName, elementName } = config;
    await loadRemoteModule(remoteName, exposedModule);
    const root = document.createElement(elementName);
    this.elm.nativeElement.appendChild(root);
  }
}
