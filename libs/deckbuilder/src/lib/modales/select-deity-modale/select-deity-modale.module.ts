import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SelectDeityModaleComponent } from './select-deity-modale.component';

@NgModule({
  declarations: [SelectDeityModaleComponent],
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule],
})
export class SelectDeityModaleModule {}
