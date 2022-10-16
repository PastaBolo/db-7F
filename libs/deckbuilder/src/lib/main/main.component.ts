import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DecksService } from '../services/decks.service';

@Component({
  selector: 'seven-fallen-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
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
