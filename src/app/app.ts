import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/auth/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css',
})
export class App implements OnInit {
  private authStore = inject(AuthStore);

  ngOnInit(): void {
    this.authStore.initFromStorage();
    this.authStore.startPermissionPolling();
  }
}
