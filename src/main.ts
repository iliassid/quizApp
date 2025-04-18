import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './app/components/home/home.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent },
      { 
        path: 'quiz',
        loadComponent: () => import('./app/components/quiz/quiz.component')
          .then(m => m.QuizComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./app/components/history/history.component')
          .then(m => m.HistoryComponent)
      }
    ])
  ]
}).catch(err => console.error(err));