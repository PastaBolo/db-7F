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
import {
  Neo4jArraySerializerInterceptor,
  Neo4jSerializerInterceptor,
} from '@seven-fallen/neo4j';
import { UserId } from '../shared';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public getCurrentUser(@UserId() uid: string) {
    return this.usersService.get(uid);
  }

  @Post('user')
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public updateUser(@UserId() uid: string, @Body() user: { name: string }) {
    return this.usersService.update(uid, user);
  }

  @Get('users')
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jArraySerializerInterceptor)
  public search() {
    return this.usersService.search();
  }

  @Get('users/:uid')
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public get(@Param('uid') uid: string) {
    return this.usersService.get(uid);
  }
}
