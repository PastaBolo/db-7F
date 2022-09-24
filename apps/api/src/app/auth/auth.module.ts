import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase' })],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
