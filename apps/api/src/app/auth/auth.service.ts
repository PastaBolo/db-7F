import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import config from '../../firebase-admin.config';

@Injectable()
export class AuthService {
  private readonly app = firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: config.project_id,
      privateKey: config.private_key,
      clientEmail: config.client_email,
    }),
  });

  public verifyIdToken(token: string): Promise<any> {
    return this.app.auth().verifyIdToken(token.replace('Bearer ', ''));
  }
}
