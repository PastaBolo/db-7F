import { NgModule } from '@angular/core';

import { DeckbuilderRoutingModule } from './deckbuilder-routing.module';
import { MainModule } from './main/main.module';
import { EditModule } from './edit/edit.module';
import { DeckModule } from './deck/deck.module';
import { NewDeckConfigModaleModule } from './modales/new-deck-config-modale/new-deck-config-modale.module';
import { SelectDeityModaleModule } from './modales/select-deity-modale/select-deity-modale.module';

@NgModule({
  imports: [
    DeckbuilderRoutingModule,
    MainModule,
    EditModule,
    DeckModule,
    NewDeckConfigModaleModule,
    SelectDeityModaleModule,
  ],
  providers: [],
})
export class DeckbuilderModule {}
