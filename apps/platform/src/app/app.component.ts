import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DecksService } from '@seven-fallen/deckbuilder';
import { AuthService } from '@seven-fallen/shared/auth';

@Component({
  selector: 'seven-fallen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly decksService: DecksService
  ) {}

  public createNewDeck(): void {
    this.decksService.createNewDeck();
  }

  public signOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['auth']));
  }
}
