import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { LetModule, MapperModule } from '@seven-fallen/ui';
import { EditComponent } from './edit.component';
import {
  CardTypeSelectModule,
  ChartsModule,
  KingdomSelectModule,
} from '../shared';
import { DeckSettingsModaleModule, SelectDeityModaleModule } from '../modales';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CdkAccordionModule,
    LetModule,
    MapperModule,
    KingdomSelectModule,
    CardTypeSelectModule,
    ChartsModule,
    DeckSettingsModaleModule,
    SelectDeityModaleModule,
  ],
})
export class EditModule {}
