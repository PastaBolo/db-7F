import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-select-deity-modale',
  templateUrl: './select-deity-modale.component.html',
  styleUrls: ['./select-deity-modale.component.scss'],
})
export class SelectDeityModaleComponent {
  public readonly deities$ = this.http.get<any[]>('cards/deities');

  constructor(
    private readonly http: HttpClient,
    private readonly dialogRef: MatDialogRef<void>
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public selectDeity(deity: any): void {
    this.dialogRef.close(deity);
  }
}
