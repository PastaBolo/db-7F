import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async get(uid: string) {
    return await this.neo4jService.read(
      `
        MATCH (u:User {uid: $uid})
        RETURN properties(u)
      `,
      { uid }
    );
  }

  public async update(uid: string, user: { name: string }) {
    return await this.neo4jService.write(
      `
        MATCH (u:User {uid: $uid})
        SET u.name = $user.name
        RETURN properties(u)
      `,
      { uid, user }
    );
  }
}
