import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  Neo4jArraySerializerInterceptor,
  Neo4jSerializerInterceptor,
} from '@seven-fallen/neo4j';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cards')
  public getCards(@Query('type') type: string) {
    return this.appService.getCards({ type: +type });
  }

  // @UseGuards(AuthGuard('firebase'))
  // @Get('hello')
  // getHello(@Req() request: any, @Headers() headers: any): { message: string } {
  //   return { message: 'coucou' };
  // }
}
