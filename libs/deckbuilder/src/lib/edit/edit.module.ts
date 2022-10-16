import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { LetModule, MapperModule } from '@seven-fallen/ui';
import { EditComponent } from './edit.component';
import {
  CardTypeSelectModule,
  ChartsModule,
  KingdomSelectModule,
} from '../shared';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkAccordionModule,
    LetModule,
    MapperModule,
    KingdomSelectModule,
    CardTypeSelectModule,
    ChartsModule,
  ],
})
export class EditModule {}