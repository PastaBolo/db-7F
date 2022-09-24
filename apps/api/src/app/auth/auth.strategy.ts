import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<{ uid: string }> {
    try {
      const data = await this.authService.verifyIdToken(
        request.headers['authorization']
      );
      return { uid: data.uid };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
