/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
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
import { byType, exportFormat, getQuantity, groupCards } from '../shared';

@Component({
  selector: 'seven-fallen-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [expand, fade],
})
export class EditComponent {
  public readonly refresh$ = new Subject<void>();

  public readonly isEditing$ = new BehaviorSubject(false);

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
  public readonly addSide$ = new Subject<any>();
  public readonly removeSide$ = new Subject<any>();

  public readonly deckCards$ = merge(
    this.data$.pipe(
      map((data) =>
        data.deck.cards
          .map((id: string) =>
            data.cardsInfo.find((card: any) => card.id === id)
          )
          .filter((card: any) => !!card)
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

  public readonly deckSide$ = merge(
    this.data$.pipe(
      map(
        (data) =>
          data.deck.side?.map((id: string) =>
            data.cardsInfo.find((card: any) => card.id === id)
          ) ?? []
      ),
      map((cards) => () => cards)
    ),
    this.addSide$.pipe(map((card) => (cards: any[]) => [...cards, card])),
    this.removeSide$.pipe(
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

  public readonly exportFile$ = combineLatest({
    deck: this.deck$,
    cards: this.deckCards$,
    side: this.deckSide$,
  }).pipe(exportFormat(this.sanitizer));

  public readonly types = [
    { type: 'Temple', label: 'Temple' },
    { type: 'Cadeau Divin', label: 'Cadeau Divin' },
    { type: 'Archange', label: 'Archange' },
    { type: 'Adorateur', label: 'Adorateurs' },
    { type: 'Ange', label: 'Anges' },
    { type: 'Golem', label: 'Golems' },
    { type: 'Equipement', label: 'Equipements' },
    { type: 'Benediction', label: 'B??n??dictions' },
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
    [10, 'Cadeau Divin'],
    [11, 'Familier'],
  ]);

  public readonly byType = byType;
  public readonly getQuantity = getQuantity;
  public readonly groupCards = groupCards;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly decksService: DecksService,
    private readonly cardsService: CardsService
  ) {}

  public remove(card: any): void {
    this.remove$.next(card);
    this.isEditing$.next(true);
  }

  public add(card: any): void {
    this.add$.next(card);
    this.isEditing$.next(true);
  }

  public addSide(card: any): void {
    this.addSide$.next(card);
    this.isEditing$.next(true);
  }

  public removeSide(card: any): void {
    this.removeSide$.next(card);
    this.isEditing$.next(true);
  }

  public fromDeckToSide(card: any, repeat: number): void {
    for (let i = 1; i <= repeat + 1; i++) {
      this.remove$.next(card);
      this.addSide$.next(card);
      this.isEditing$.next(true);
    }
  }

  public fromSideToDeck(card: any, repeat: number): void {
    for (let i = 1; i <= repeat + 1; i++) {
      this.removeSide$.next(card);
      this.add$.next(card);
      this.isEditing$.next(true);
    }
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
        this.submit();
      });
  }

  public editDeity() {
    this.deck$
      .pipe(
        take(1),
        switchMap((deck) =>
          this.dialog
            .open(SelectDeityModaleComponent, {
              data: { kingdomId: deck.deity.kingdomId },
            })
            .afterClosed()
            .pipe(
              switchMap((deityId?: string) =>
                deityId
                  ? this.decksService.updateDeity(deck.id, deityId)
                  : EMPTY
              )
            )
        )
      )
      .subscribe(() => {
        this.submit();
      });
  }

  public submit() {
    combineLatest({
      deck: this.deck$,
      cards: this.deckCards$,
      side: this.deckSide$,
    })
      .pipe(
        take(1),
        switchMap(({ deck, cards, side }) =>
          this.decksService.update(
            deck.id,
            cards.map((card) => card.id),
            side.map((card) => card.id)
          )
        )
      )
      .subscribe(() => {
        this.snackbar.open('Deck mis ?? jour', 'Ok', { duration: 5000 });
        this.refresh$.next();
        this.isEditing$.next(false);
      });
  }

  public openFullScreen(
    card: any,
    tmpl: TemplateRef<{ $implicit: any }>
  ): void {
    this.dialog.open(tmpl, { data: card, panelClass: 'full-screen-card' });
  }

  public delete(id: string): void {
    this.decksService.delete(id).subscribe(() => {
      this.isEditing$.next(false);
      this.router.navigate(['.']);
    });
  }
}
