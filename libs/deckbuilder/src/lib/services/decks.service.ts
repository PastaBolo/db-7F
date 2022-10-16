import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, of, EMPTY } from 'rxjs';

import { NewDeckConfigModaleComponent } from '../modales/new-deck-config-modale/new-deck-config-modale.component';
import { SelectDeityModaleComponent } from '../modales/select-deity-modale/select-deity-modale.component';

@Injectable()
export class DecksService {
  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog
  ) {}

  public get(id: string) {
    return this.http.get<any>(`decks/${id}`);
  }

  public createNewDeck() {
    return this.dialog
      .open(SelectDeityModaleComponent)
      .afterClosed()
      .pipe(
        switchMap((deity?: any) =>
          deity
            ? this.dialog
                .open(NewDeckConfigModaleComponent)
                .afterClosed()
                .pipe(
                  switchMap((formValue?: any) =>
                    formValue ? of({ deity, config: formValue }) : EMPTY
                  )
                )
            : EMPTY
        ),
        switchMap((values) =>
          this.http.post('decks', {
            deityId: values.deity.id,
            name: values.config.name,
          })
        )
      );
  }

  public save(id: string, cards: any): any {
    return this.http.post(`decks/${id}`, cards);
  }
}