import { NgModule } from '@angular/core';

import { DeckbuilderRoutingModule } from './deckbuilder-routing.module';
import { MainModule } from './main/main.module';
import { EditModule } from './edit/edit.module';
import { DeckModule } from './deck/deck.module';
import { KingdomSelectModaleModule, SelectDeityModaleModule } from './modales';

@NgModule({
  imports: [
    DeckbuilderRoutingModule,
    MainModule,
    EditModule,
    DeckModule,
    SelectDeityModaleModule,
    KingdomSelectModaleModule,
  ],
  providers: [],
})
export class DeckbuilderModule {}
