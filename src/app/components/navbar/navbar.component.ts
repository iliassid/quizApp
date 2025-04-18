import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Quiz Game</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Home
          </a>
          <a class="nav-link" routerLink="/history" routerLinkActive="active">
            History
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}