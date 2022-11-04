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

  public search({
    deityId,
  }: Partial<{
    deityId: string;
  }>) {
    return this.http.get<any[]>(`decks/search`, {
      params: { ...(deityId && { deityId }) },
    });
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

  public updateSettings(
    id: string,
    settings: { name: string; private: boolean }
  ) {
    return this.http.post(`decks/${id}/settings`, settings);
  }

  public updateDeity(id: string, deityId: string): any {
    return this.http.post(`decks/${id}/deity`, { deityId });
  }

  public update(id: string, cards: any, side: any) {
    return this.http.post(`decks/${id}`, { cards, side });
  }
}
