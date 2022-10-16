import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { LetModule, MapperModule } from '@seven-fallen/ui';
import { DeckComponent } from './deck.component';
import { ChartsModule } from '../shared';

@NgModule({
  declarations: [DeckComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    CdkAccordionModule,
    LetModule,
    MapperModule,
    ChartsModule,
  ],
})
export class DeckModule {}
