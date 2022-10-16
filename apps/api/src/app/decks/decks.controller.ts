import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Neo4jSerializerInterceptor } from '@seven-fallen/neo4j';

import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  @UseInterceptors(Neo4jSerializerInterceptor)
  public create(@Body('deityId') deityId: string, @Body('name') name: string) {
    return this.decksService.create(deityId, name);
  }

  @Get(':id')
  @UseInterceptors(Neo4jSerializerInterceptor)
  public get(@Param('id') id: string) {
    return this.decksService.get(id);
  }

  @Post(':id')
  public save(@Param('id') id: string, @Body() cards: any[]) {
    return this.decksService.save(id, cards);
  }
}
