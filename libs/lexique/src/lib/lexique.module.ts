import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { LetModule, MapperModule } from '@seven-fallen/ui';
import { LexiqueRoutingModule } from './lexique-routing.module';
import { LexiqueComponent } from './lexique.component';

@NgModule({
  declarations: [LexiqueComponent],
  imports: [
    CommonModule,
    LexiqueRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkAccordionModule,
    MapperModule,
    LetModule,
  ],
})
export class LexiqueModule {}
