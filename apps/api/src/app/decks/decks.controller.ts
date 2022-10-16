import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Neo4jSerializerInterceptor } from '@seven-fallen/neo4j';

import { UserId } from '../shared';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get(':id')
  @UseInterceptors(Neo4jSerializerInterceptor)
  public get(@Param('id') id: string) {
    return this.decksService.get(id);
  }

  @Post()
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public create(
    @UserId() uid: string,
    @Body('deityId') deityId: string,
    @Body('name') name: string
  ) {
    return this.decksService.create(uid, deityId, name);
  }

  @Post(':id')
  @UseGuards(AuthGuard('firebase'))
  public update(
    @UserId() uid: string,
    @Param('id') id: string,
    @Body() cards: any[]
  ) {
    return this.decksService.update(uid, id, cards);
  }
}
