import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import * as express from 'express';

import { http } from '@google-cloud/functions-framework';
import { ExpressAdapter } from '@nestjs/platform-express';
import { environment } from './environments/environment';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  app.enableCors({ origin: '*' });
  return app.init();
};

createNestServer(server)
  .then((v) => {
    if (environment.production) {
      Logger.log('🚀 Starting production server...');
    } else {
      Logger.log(
        `🚀 Starting development server on http://localhost:${
          process.env.PORT || 3333
        }`
      );
      v.listen(process.env.PORT || 3333);
    }
  })
  .catch((err) => Logger.error('Nest broken', err));

http('api', server);
