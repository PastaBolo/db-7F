import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-deck-settings-modale',
  templateUrl: './deck-settings-modale.component.html',
  styleUrls: ['./deck-settings-modale.component.scss'],
})
export class DeckSettingsModaleComponent {
  public readonly form = new FormGroup({
    name: new FormControl(this.deck.name, [Validators.required]),
    private: new FormControl(this.deck.private, [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA)
    private readonly deck: { name: string; private: boolean }
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
