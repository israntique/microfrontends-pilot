import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe1-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  profile: any = null;

  constructor(private api: ApiService) {}
  me() {
    this.api.get('me').subscribe((data) => {
      this.profile = data;
    });
  }
}
