import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-new-deck-config-modale',
  templateUrl: './new-deck-config-modale.component.html',
  styleUrls: ['./new-deck-config-modale.component.scss'],
})
export class NewDeckConfigModaleComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private readonly dialogRef: MatDialogRef<void>) {}

  public close(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
