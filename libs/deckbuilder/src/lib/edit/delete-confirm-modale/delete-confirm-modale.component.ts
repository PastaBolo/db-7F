import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-delete-confirm-modale',
  templateUrl: './delete-confirm-modale.component.html',
  styleUrls: ['./delete-confirm-modale.component.scss'],
})
export class DeleteConfirmModaleComponent {
  constructor(private readonly dialogRef: MatDialogRef<void>) {}

  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
