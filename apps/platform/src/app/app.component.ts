import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DecksService } from '@seven-fallen/deckbuilder';

@Component({
  selector: 'seven-fallen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly decksService: DecksService
  ) {}

  public createNewDeck(): void {
    this.decksService
      .createNewDeck()
      .subscribe((deck: any) =>
        this.router.navigate(['edit', deck.id], { relativeTo: this.route })
      );
  }
}
