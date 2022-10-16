import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MapperModule } from '@seven-fallen/ui';
import { ChartsComponent } from './charts.component';
import { BarChartDirective } from './bar-chart.directive';

@NgModule({
  declarations: [ChartsComponent, BarChartDirective],
  imports: [CommonModule, CdkAccordionModule, MapperModule],
  exports: [ChartsComponent],
})
export class ChartsModule {}
