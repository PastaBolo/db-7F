import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { PermissionsModule, MapperModule, LetModule } from '@seven-fallen/ui';
import { DeckComponent } from './deck.component';
import { ChartsModule } from '../shared';

@NgModule({
  declarations: [DeckComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    CdkAccordionModule,
    PermissionsModule,
    MapperModule,
    ChartsModule,
    PermissionsModule,
    LetModule,
  ],
})
export class DeckModule {}