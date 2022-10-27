import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-select-deity-modale',
  templateUrl: './select-deity-modale.component.html',
  styleUrls: ['./select-deity-modale.component.scss'],
})
export class SelectDeityModaleComponent {
  public readonly deities$ = this.http.get<any[]>(
    `cards/search?type=1&kingdomId=${this.data.kingdomId}`
  );

  constructor(
    private readonly http: HttpClient,
    private readonly dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { kingdomId: string }
  ) {}

  public close(deityId?: string): void {
    this.dialogRef.close(deityId);
  }
}
