import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import {
  LetModule,
  MapperModule,
  PreviewOverModule,
  RepeatModule,
} from '@seven-fallen/ui';
import {
  CardTypeSelectModule,
  ChartsModule,
  KingdomSelectModule,
} from '../shared';
import { DeckSettingsModaleModule, SelectDeityModaleModule } from '../modales';
import { EditComponent } from './edit.component';
import { DeleteConfirmModaleComponent } from './delete-confirm-modale/delete-confirm-modale.component';

@NgModule({
  declarations: [EditComponent, DeleteConfirmModaleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    CdkAccordionModule,
    LetModule,
    MapperModule,
    KingdomSelectModule,
    CardTypeSelectModule,
    ChartsModule,
    DeckSettingsModaleModule,
    SelectDeityModaleModule,
    PreviewOverModule,
    RepeatModule,
  ],
})
export class EditModule {}
