import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  template: `
    <nav>
      <a routerLink="/">accueil</a>
      <a routerLink="/historique">historique</a>
      <a routerLink="/quiz">quiz</a>
      <a routerLink="/resultat">resultat</a>
    </nav>
  `,
})
export class HeaderComponent {}
