import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Neo4jSerializerInterceptor } from '@seven-fallen/neo4j';
import { AuthService } from './auth.service';
import { UserId } from '../shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  @UseGuards(AuthGuard('firebase'))
  @UseInterceptors(Neo4jSerializerInterceptor)
  public signIn(@UserId() uid: string) {
    return this.authService.signIn(uid);
  }
}
