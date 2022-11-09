import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DeckComponent } from './deck/deck.component';
import { EditComponent } from './edit/edit.component';
import { DecksComponent } from './decks/decks.component';
import { IsEditingGuard } from './guards/is-editing.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: DecksComponent },
      { path: ':id', component: DeckComponent },
      {
        path: 'edit/:id',
        component: EditComponent,
        canDeactivate: [IsEditingGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckbuilderRoutingModule {}
