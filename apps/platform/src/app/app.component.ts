import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DecksService } from '@seven-fallen/deckbuilder';
import { AuthService } from '@seven-fallen/shared/auth';

@Component({
  selector: 'seven-fallen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly decksService: DecksService
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
