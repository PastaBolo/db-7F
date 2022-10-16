import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule.register({ defaultStrategy: 'firebase' })],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
