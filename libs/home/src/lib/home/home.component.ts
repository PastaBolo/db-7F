import { Component } from '@angular/core';

import { DecksService } from '@seven-fallen/deckbuilder';
import { UsersService } from '@seven-fallen/shared/services';

@Component({
  selector: 'seven-fallen-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public readonly currentUser$ = this.usersService.currentUser$;

  constructor(
    private readonly decksService: DecksService,
    private readonly usersService: UsersService
  ) {}

  public createNewDeck(): void {
    this.decksService.createNewDeck();
  }
}
