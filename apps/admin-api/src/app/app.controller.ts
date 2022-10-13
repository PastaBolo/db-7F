import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  public search(@Query('search') search: string) {
    return this.appService.search(search);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('edition') edition: string,
    @Body('id') id: string,
    @Body('number') number: string
  ) {
    return this.appService.upload(file, edition, id, number);
  }
}
