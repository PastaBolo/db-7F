import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KingdomSelectComponent } from './kingdom-select.component';

@NgModule({
  declarations: [KingdomSelectComponent],
  imports: [CommonModule],
  exports: [KingdomSelectComponent],
})
export class KingdomSelectModule {}
