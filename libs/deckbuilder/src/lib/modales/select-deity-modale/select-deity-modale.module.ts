import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SelectDeityModaleComponent } from './select-deity-modale.component';

@NgModule({
  declarations: [SelectDeityModaleComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class SelectDeityModaleModule {}
