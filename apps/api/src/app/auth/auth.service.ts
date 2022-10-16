import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';
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

  constructor(private readonly neo4jService: Neo4jService) {}

  public async signIn(uid: string) {
    return await this.neo4jService.read(
      `
        MERGE (u:User {uid: $uid})
        ON CREATE SET u.name = apoc.text.join(['user', $uid], '-')
        RETURN properties(u)
      `,
      { uid }
    );
  }

  public verifyIdToken(token: string): Promise<any> {
    return this.app.auth().verifyIdToken(token.replace('Bearer ', ''));
  }
}
