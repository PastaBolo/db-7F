import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { KingdomSelectModule } from '../shared';
import { DecksComponent } from './decks.component';

@NgModule({
  declarations: [DecksComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule,
    KingdomSelectModule,
  ],
})
export class DecksModule {}
