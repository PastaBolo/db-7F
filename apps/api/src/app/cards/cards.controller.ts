import {
  Controller,
  Get,
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
    @Query('kingdomId') kingdomId: string,
    @Query('type', ParseIntPipe) type: number
  ) {
    return this.cardsService.search({ kingdomId, type });
  }

  @Get('deities')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public getDeities() {
    return this.cardsService.getDeities();
  }
}
