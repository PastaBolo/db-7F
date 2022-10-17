import { NgModule } from '@angular/core';

import { DeckbuilderRoutingModule } from './deckbuilder-routing.module';
import { MainModule } from './main/main.module';
import { EditModule } from './edit/edit.module';
import { DeckModule } from './deck/deck.module';
import { NewDeckConfigModaleModule, SelectDeityModaleModule } from './modales';

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
