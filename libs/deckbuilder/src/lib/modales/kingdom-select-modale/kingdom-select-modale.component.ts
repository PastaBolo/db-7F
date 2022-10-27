import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'seven-fallen-kingdom-select-modale',
  templateUrl: './kingdom-select-modale.component.html',
  styleUrls: ['./kingdom-select-modale.component.scss'],
})
export class KingdomSelectModaleComponent {
  public readonly kingdoms = [
    {
      id: '32ac1793-8519-47fa-b79f-e6f0becf3042',
      imgPath: 'logo_eondra.png',
      name: 'Eondra',
    },
    {
      id: 'a4e00b23-0197-45bd-91fa-6ce9f6cdf75d',
      imgPath: 'logo_poseidia.png',
      name: 'Poseidia',
    },
    {
      id: '0ae86bda-1623-46fe-b9c1-a9a4179c6ec2',
      imgPath: 'logo_metascience.png',
      name: 'Metascience',
    },
    {
      id: '72ab7997-0037-46c8-aee4-1562fd7cdb62',
      imgPath: 'logo_nsf.png',
      name: 'Nuit Sans Fin',
    },
    {
      id: '5b9c3653-9350-4c4b-a7c8-b6200fce022e',
      imgPath: 'logo_tdl.png',
      name: 'Temple de la Lumière',
    },
    {
      id: '8ebcfb93-13e0-4fc5-8949-8cdf44e804ea',
      imgPath: 'logo_voie.png',
      name: 'La Voie',
    },
    {
      id: 'd7e4c035-28a0-46ca-a0f3-d45d213e7908',
      imgPath: 'logo_purete_celeste.png',
      name: 'Pureté Céleste',
    },
  ];

  constructor(private readonly dialogRef: MatDialogRef<void>) {}

  public close(id?: string) {
    this.dialogRef.close(id);
  }
}
