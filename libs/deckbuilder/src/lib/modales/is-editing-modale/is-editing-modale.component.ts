import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-is-editing-modale',
  templateUrl: './is-editing-modale.component.html',
  styleUrls: ['./is-editing-modale.component.scss'],
})
export class IsEditingModaleComponent {
  constructor(private readonly dialogRef: MatDialogRef<void>) {}

  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
