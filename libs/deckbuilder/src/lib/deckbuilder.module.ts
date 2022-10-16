import { NgModule } from '@angular/core';

import { DeckbuilderRoutingModule } from './deckbuilder-routing.module';
import { MainModule } from './main/main.module';
import { EditModule } from './edit/edit.module';
import { NewDeckConfigModaleModule } from './modales/new-deck-config-modale/new-deck-config-modale.module';
import { SelectDeityModaleModule } from './modales/select-deity-modale/select-deity-modale.module';
import { DecksService } from './services/decks.service';

@NgModule({
  imports: [
    DeckbuilderRoutingModule,
    MainModule,
    EditModule,
    NewDeckConfigModaleModule,
    SelectDeityModaleModule,
  ],
  providers: [DecksService],
})
export class DeckbuilderModule {}
