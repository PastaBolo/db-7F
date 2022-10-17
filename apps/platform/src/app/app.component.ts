import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DecksService } from '@seven-fallen/deckbuilder';
import { AuthService } from '@seven-fallen/shared/auth';
import { UsersService } from '@seven-fallen/shared/services';

@Component({
  selector: 'seven-fallen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly currentUser$ = this.usersService.currentUser$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly decksService: DecksService,
    private readonly usersService: UsersService
  ) {}

  public createNewDeck(): void {
    this.decksService.createNewDeck();
  }

  public signOut(): void {
    this.authService.signOut();
  }

  public openSettings(settingsTmpl: TemplateRef<void>) {
    this.dialog.open(settingsTmpl);
  }
}
