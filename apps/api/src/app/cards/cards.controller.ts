import {
  Controller,
  Get,
  Optional,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Neo4jArraySerializerInterceptor } from '@seven-fallen/neo4j';

import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('search')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public search(
    @Query('type', ParseIntPipe) type: number,
    @Query('kingdomId') kingdomId: string,
    @Query('classId') classId: string,
    @Query('abilityId') abilityId: string
  ) {
    return this.cardsService.search({ type, kingdomId, classId, abilityId });
  }

  @Get('deities')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public getDeities() {
    return this.cardsService.getDeities();
  }

  @Get('classes')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public getClasses(@Optional() @Query('kingdomId') kingdomId?: string) {
    return this.cardsService.getClasses(kingdomId);
  }

  @Get('abilities')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public getAbilities(@Optional() @Query('kingdomId') kingdomId?: string) {
    return this.cardsService.getAbilities(kingdomId);
  }
}
