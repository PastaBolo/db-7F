import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Neo4jArraySerializerInterceptor,
  Neo4jSerializerInterceptor,
} from '@seven-fallen/neo4j';

import { UserId } from '../shared';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get('search')
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public search(@Query('deityId') deityId: string) {
    return this.decksService.search({ deityId });
  }

  @Get(':id')
  @UseInterceptors(Neo4jSerializerInterceptor)
  public get(@Param('id') id: string) {
    return this.decksService.get(id);
  }

  @Post()
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public create(@UserId() uid: string, @Body('deityId') deityId: string) {
    return this.decksService.create(uid, deityId);
  }

  @Post(':id')
  @UseGuards(AuthGuard('firebase'))
  public update(
    @UserId() uid: string,
    @Param('id') id: string,
    @Body() { cards, side }: { cards: any[]; side: any[] }
  ) {
    return this.decksService.update(uid, id, cards, side);
  }

  @Post(':id/settings')
  @UseGuards(AuthGuard('firebase'))
  public updateSettings(
    @UserId() uid: string,
    @Param('id') id: string,
    @Body() settings: { name: string; private: boolean }
  ) {
    return this.decksService.updateSettings(uid, id, settings);
  }

  @Post(':id/deity')
  @UseGuards(AuthGuard('firebase'))
  public updateDeity(
    @UserId() uid: string,
    @Param('id') id: string,
    @Body() { deityId }: { deityId: string }
  ) {
    return this.decksService.updateDeity(uid, id, deityId);
  }
}
