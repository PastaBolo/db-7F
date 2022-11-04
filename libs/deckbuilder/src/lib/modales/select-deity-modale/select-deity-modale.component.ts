import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardsService } from '../../services';

@Component({
  selector: 'seven-fallen-select-deity-modale',
  templateUrl: './select-deity-modale.component.html',
  styleUrls: ['./select-deity-modale.component.scss'],
})
export class SelectDeityModaleComponent {
  public readonly deities$ = this.cardsService.search({
    type: 1,
    kingdomId: this.data.kingdomId,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<void>,
    private readonly cardsService: CardsService,
    @Inject(MAT_DIALOG_DATA) public readonly data: { kingdomId: string }
  ) {
    console.log(data);
  }

  public close(deityId?: string): void {
    this.dialogRef.close(deityId);
  }
}
