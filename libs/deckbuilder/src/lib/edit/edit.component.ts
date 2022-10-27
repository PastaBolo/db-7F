/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
} from 'rxjs';

import { expand, fade } from '@seven-fallen/ui';
import { CardsService, DecksService } from '../services';
import {
  DeckSettingsModaleComponent,
  SelectDeityModaleComponent,
} from '../modales';

@Component({
  selector: 'seven-fallen-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [expand, fade],
})
export class EditComponent {
  public refresh$ = new Subject<void>();

  public readonly data$ = this.refresh$.pipe(
    startWith(null),
    switchMap(() => this.route.params),
    switchMap((params) => this.decksService.get(params['id'])),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly deck$ = this.data$.pipe(
    map((data) => data.deck),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly add$ = new Subject<any>();
  public readonly remove$ = new Subject<any>();

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
    map((deck) => deck.deity.kingdomId),
    distinctUntilChanged(),
    map(
      (kingdomId) =>
        new FormGroup({
          type: new FormControl(5, {
            nonNullable: true,
          }),
          kingdomId: new FormControl<string>(kingdomId, {
            nonNullable: true,
          }),
          classId: new FormControl(null),
          abilityId: new FormControl(null),
        })
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly classes$ = this.filters$.pipe(
    switchMap((filters) =>
      filters
        .get('kingdomId')!
        .valueChanges.pipe(startWith(filters.get('kingdomId')!.value))
    ),
    switchMap((kingdomId) => this.cardsService.getClasses(kingdomId))
  );

  public readonly abilities$ = this.filters$.pipe(
    switchMap((filters) =>
      filters
        .get('kingdomId')!
        .valueChanges.pipe(startWith(filters.get('kingdomId')!.value))
    ),
    switchMap((kingdomId) => this.cardsService.getAbilities(kingdomId))
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
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly decksService: DecksService,
    private readonly cardsService: CardsService
  ) {}

  public remove(card: any) {
    this.remove$.next(card);
  }

  public add(card: any) {
    this.add$.next(card);
  }

  public editSettings() {
    this.deck$
      .pipe(
        take(1),
        switchMap((deck) =>
          this.dialog
            .open(DeckSettingsModaleComponent, {
              data: deck,
            })
            .afterClosed()
            .pipe(
              filter((formValue?: any) => !!formValue),
              map((formValue) => ({ deck, formValue })),
              switchMap(({ deck, formValue }: { deck: any; formValue: any }) =>
                this.decksService.updateSettings(deck.id, formValue)
              )
            )
        )
      )
      .subscribe(() => {
        this.snackbar.open(
          'Les détails du deck ont bien été mis à jour',
          'Ok',
          { duration: 5000 }
        );
        this.refresh$.next();
      });
  }

  public editDeity() {
    combineLatest({
      deck: this.deck$,
      deity: this.dialog
        .open(SelectDeityModaleComponent)
        .afterClosed()
        .pipe(filter((formValue?: any) => !!formValue)),
    })
      .pipe(
        take(1),
        switchMap(({ deck, deity }: { deck: any; deity: any }) =>
          this.decksService.updateDeity(deck.id, deity)
        )
      )
      .subscribe(() => {
        this.snackbar.open('La divinité a bien été modifiée', 'Ok', {
          duration: 5000,
        });
        this.refresh$.next();
      });
  }

  public submit() {
    combineLatest({ deck: this.deck$, cards: this.deckCards$ })
      .pipe(
        take(1),
        switchMap(({ deck, cards }) =>
          this.decksService.update(
            deck.id,
            cards.map((card) => card.id)
          )
        )
      )
      .subscribe(() => {
        this.snackbar.open('Deck mis à jour', 'Ok', { duration: 5000 });
      });
  }

  public openFullScreen(
    card: any,
    tmpl: TemplateRef<{ $implicit: any }>
  ): void {
    this.dialog.open(tmpl, { data: card, panelClass: 'full-screen-card' });
  }
}
