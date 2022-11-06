import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay, switchMap } from 'rxjs';

import { expand, fade } from '@seven-fallen/ui';
import { DecksService } from '../services/decks.service';

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

  public readonly byType = (cards: any[], type: string) =>
    cards.filter((card) => card.type === type);

  public readonly getQuantity = (card: any, cards: any[]) =>
    cards.filter(({ id }) => id === card.id).length;

  public readonly groupCards = (cards: any[]) =>
    cards.reduce((groups: { card: any; qty: number }[], card) => {
      const group = groups.find((group) => group.card.id === card.id);
      if (group) {
        group.qty++;
        return groups;
      } else {
        return [...groups, { card, qty: 1 }];
      }
    }, []);

  constructor(
    private readonly route: ActivatedRoute,
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
