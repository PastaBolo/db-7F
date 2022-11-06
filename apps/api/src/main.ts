/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import { Logger } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//   app.enableCors();
//   const port = process.env.PORT || 3333;
//   await app.listen(port);
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//   );
// }

// bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

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
  //  const globalPrefix = '';
  //  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
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
