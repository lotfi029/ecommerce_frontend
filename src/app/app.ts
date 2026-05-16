import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, ScrollTopComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
    <app-scroll-top></app-scroll-top>
  `,
  styleUrl: './app.css',
})
export class App {}
