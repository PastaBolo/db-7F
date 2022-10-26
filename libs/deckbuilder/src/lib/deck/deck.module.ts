import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import {
  PermissionsModule,
  MapperModule,
  LetModule,
  PreviewOverModule,
} from '@seven-fallen/ui';
import { DeckComponent } from './deck.component';
import { ChartsModule } from '../shared';

@NgModule({
  declarations: [DeckComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    CdkAccordionModule,
    PermissionsModule,
    MapperModule,
    ChartsModule,
    PermissionsModule,
    LetModule,
    PreviewOverModule,
  ],
})
export class DeckModule {}
