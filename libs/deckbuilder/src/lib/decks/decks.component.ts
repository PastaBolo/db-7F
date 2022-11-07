import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, of, startWith, Subject, switchMap, takeUntil } from 'rxjs';

import { listFade } from '@seven-fallen/ui';
import { CardsService, DecksService } from '../services';

@Component({
  selector: 'seven-fallen-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  animations: [listFade],
})
export class DecksComponent implements OnDestroy {
  public readonly filters = new FormGroup({
    kingdomId: new FormControl<string>(''),
    deityId: new FormControl<string>(''),
  });

  public readonly deities$ = this.filters
    .get('kingdomId')
    ?.valueChanges.pipe(
      switchMap((kingdomId) =>
        kingdomId ? this.cardsService.search({ type: 1, kingdomId }) : of([])
      )
    );

  public readonly decks$ = this.filters
    .get('deityId')
    ?.valueChanges.pipe(
      switchMap((deityId) =>
        deityId ? this.decksService.search({ deityId }) : of([])
      )
    );

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly cardsService: CardsService,
    private readonly decksService: DecksService
  ) {
    this.filters
      .get('kingdomId')
      ?.valueChanges.pipe(
        startWith(this.filters.get('kingdomId')?.value),
        takeUntil(this.destroy$)
      )
      .subscribe((kingdomId) => {
        if (kingdomId) {
          this.filters.get('deityId')?.setValue('');
          this.filters.get('deityId')?.enable();
        } else {
          this.filters.get('deityId')?.setValue('');
          this.filters.get('deityId')?.disable();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
