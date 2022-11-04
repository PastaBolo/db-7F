import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Neo4jModule } from '@seven-fallen/neo4j';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { DecksModule } from './decks/decks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    Neo4jModule.forRootAsync(),
    CardsModule,
    DecksModule,
    UsersModule,
  ],
})
export class AppModule {}
