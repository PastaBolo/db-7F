import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardTypeSelectComponent } from './card-type-select.component';

@NgModule({
  declarations: [CardTypeSelectComponent],
  imports: [CommonModule],
  exports: [CardTypeSelectComponent],
})
export class CardTypeSelectModule {}
