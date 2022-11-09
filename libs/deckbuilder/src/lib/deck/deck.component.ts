import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';

import { expand, fade } from '@seven-fallen/ui';
import { DecksService } from '../services';
import { byType, exportFormat, getQuantity, groupCards } from '../shared';

@Component({
  selector: 'seven-fallen-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  animations: [expand, fade],
})
export class DeckComponent {
  public readonly data$ = this.route.params.pipe(
    switchMap((params) => this.decksService.get(params['id'])),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly cards$ = this.data$.pipe(
    map(({ deck, cardsInfo }) =>
      deck.cards.map((id: string) =>
        cardsInfo.find((card: any) => card.id === id)
      )
    )
  );

  public readonly deckSide$ = this.data$.pipe(
    map(
      (data) =>
        data.deck.side?.map((id: string) =>
          data.cardsInfo.find((card: any) => card.id === id)
        ) ?? []
    )
  );

  public readonly exportFile$ = combineLatest({
    deck: this.data$.pipe(map((data) => data.deck)),
    cards: this.cards$,
    side: this.deckSide$,
  }).pipe(exportFormat(this.sanitizer));

  public readonly types = [
    { type: 'Temple', label: 'Temple' },
    { type: 'CadeauDivin', label: 'Cadeau Divin' },
    { type: 'Archange', label: 'Archange' },
    { type: 'Adorateur', label: 'Adorateurs' },
    { type: 'Ange', label: 'Anges' },
    { type: 'Golem', label: 'Golems' },
    { type: 'Equipement', label: 'Equipements' },
    { type: 'Benediction', label: 'Bénédictions' },
    { type: 'Miracle', label: 'Miracles' },
    { type: 'Familier', label: 'Familiers' },
  ];

  public readonly cardTypes = new Map([
    [2, 'Archange'],
    [3, 'Temple'],
    [4, 'Adorateur'],
    [5, 'Ange'],
    [6, 'Golem'],
    [7, 'Equipement'],
    [8, 'Benediction'],
    [9, 'Miracle'],
    [10, 'CadeauDivin'],
    [11, 'Familier'],
  ]);

  public readonly byType = byType;
  public readonly getQuantity = getQuantity;
  public readonly groupCards = groupCards;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly decksService: DecksService
  ) {}

  public openFullScreen(
    card: any,
    tmpl: TemplateRef<{ $implicit: any }>
  ): void {
    this.dialog.open(tmpl, { data: card, panelClass: 'full-screen-card' });
  }
}
