import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

@Injectable()
export class UsersService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async get(uid: string) {
    return await this.neo4jService.read(
      `
        MATCH (u:User {uid: $uid})
        OPTIONAL MATCH (u)-[:HAS_BUILT]->(d:Deck)--(de:Card:Divinite)--(kingdom:Kingdom)
        OPTIONAL MATCH (de)--(i:CardInstance)
        WITH d{id: d.id, name: d.name, private: apoc.label.exists(d, "Private"), deity: {id: de.id, name: de.name, kingdom: properties(kingdom), images: collect(i.imgSrc)}} as deck, u
        RETURN u{.*, decks: collect(properties(deck))}
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

  public async search() {
    return await this.neo4jService.read(
      `
        MATCH (u:User)
        RETURN properties(u)
      `
    );
  }
}
