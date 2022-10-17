import { Component } from '@angular/core';

import { DecksService } from '@seven-fallen/deckbuilder';

@Component({
  selector: 'seven-fallen-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private readonly decksService: DecksService) {}

  public createNewDeck(): void {
    this.decksService.createNewDeck();
  }
}
