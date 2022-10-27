import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LexiqueComponent } from './lexique.component';

const routes: Routes = [{ path: '', component: LexiqueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LexiqueRoutingModule {}
