import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Neo4jSerializerInterceptor } from '@seven-fallen/neo4j';
import { UserId } from '../shared';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public getCurrentUser(@UserId() uid: string) {
    return this.userService.get(uid);
  }

  @Post()
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public updateUser(@UserId() uid: string, @Body() user: { name: string }) {
    return this.userService.update(uid, user);
  }
}
