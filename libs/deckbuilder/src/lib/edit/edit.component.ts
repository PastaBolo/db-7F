import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  combineLatest,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
} from 'rxjs';
import { CardsService } from '../services/cards.service';
import { DecksService } from '../services/decks.service';

@Component({
  selector: 'seven-fallen-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [
    trigger('expand', [
      state('*', style({ height: '*', opacity: 1 })),
      state('void', style({ height: 0, opacity: 0 })),
      transition('* => *', animate('150ms ease-in-out')),
    ]),
  ],
})
export class EditComponent {
  public readonly data$ = this.route.params.pipe(
    switchMap((params) => this.decksService.get(params['id'])),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly deck$ = this.data$.pipe(
    map((data) => data.deck),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public add$ = new Subject<any>();
  public remove$ = new Subject<any>();

  public readonly deckCards$ = merge(
    this.data$.pipe(
      map((data) =>
        data.deck.cards.map((id: string) =>
          data.cardsInfo.find((card: any) => card.id === id)
        )
      ),
      map((cards) => () => cards)
    ),
    this.add$.pipe(map((card) => (cards: any[]) => [...cards, card])),
    this.remove$.pipe(
      map((card) => (cards: any[]) => {
        const index = cards.findIndex(({ id }) => id === card.id);
        return [...cards.slice(0, index), ...cards.slice(index + 1)];
      })
    )
  ).pipe(
    scan((cards: any[], fn: (cards: any[]) => any[]) => fn(cards), []),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly filters$ = this.deck$.pipe(
    map(
      (deck) =>
        new FormGroup({
          kingdomId: new FormControl<string>(deck.deity.kingdomId, {
            nonNullable: true,
          }),
          type: new FormControl(5, {
            nonNullable: true,
          }),
        })
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly cardsSearch$ = this.filters$.pipe(
    switchMap((filters) => filters.valueChanges.pipe(startWith(filters.value))),
    switchMap((filters) => this.cardsService.search(filters))
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
    private readonly decksService: DecksService,
    private readonly cardsService: CardsService
  ) {}

  public remove(card: any) {
    this.remove$.next(card);
  }

  public add(card: any) {
    this.add$.next(card);
  }

  public submit() {
    combineLatest({ deck: this.deck$, cards: this.deckCards$ })
      .pipe(
        take(1),
        switchMap(({ deck, cards }) =>
          this.decksService.save(
            deck.id,
            cards.map((card) => card.id)
          )
        )
      )
      .subscribe();
  }
}
