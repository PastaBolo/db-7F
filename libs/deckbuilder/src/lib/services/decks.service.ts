import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, of, EMPTY } from 'rxjs';

import {
  KingdomSelectModaleComponent,
  SelectDeityModaleComponent,
} from '../modales';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  public get(id: string) {
    return this.http.get<any>(`decks/${id}`);
  }

  public createNewDeck() {
    return this.dialog
      .open(KingdomSelectModaleComponent)
      .afterClosed()
      .pipe(
        switchMap((kingdomId?: string) =>
          kingdomId
            ? this.dialog
                .open(SelectDeityModaleComponent, { data: { kingdomId } })
                .afterClosed()
            : EMPTY
        ),
        switchMap((deityId) => this.http.post('decks', { deityId }))
      )
      .subscribe((deck: any) => this.router.navigate(['decks/edit', deck.id]));
  }

  public updateSettings(id: string, settings: any) {
    return this.http.post(`decks/${id}/settings`, settings);
  }

  public updateDeity(id: any, deity: any): any {
    return this.http.post(`decks/${id}/deity`, { deityId: deity.id });
  }

  public update(id: string, cards: any) {
    return this.http.post(`decks/${id}`, cards);
  }
}
