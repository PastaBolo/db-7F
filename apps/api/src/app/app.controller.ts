import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard('firebase'))
  @Get('hello')
  getHello(@Req() request: any, @Headers() headers: any): { message: string } {
    return { message: 'coucou' };
  }
}
