import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable, map, switchMap, EMPTY, of } from 'rxjs';

import { EditComponent } from '../edit/edit.component';
import { IsEditingModaleComponent } from '../modales/is-editing-modale';

@Injectable({
  providedIn: 'root',
})
export class IsEditingGuard implements CanDeactivate<EditComponent> {
  constructor(private readonly dialog: MatDialog) {}

  canDeactivate(component: EditComponent): Observable<boolean> {
    return component.isEditing$.pipe(
      switchMap((isEditing) =>
        isEditing
          ? this.dialog
              .open(IsEditingModaleComponent)
              .afterClosed()
              .pipe(map((confirm?: boolean) => !!confirm))
          : of(true)
      )
    );
  }
}
