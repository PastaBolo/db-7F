import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

@Injectable()
export class DecksService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async get(id: string) {
    return await this.neo4jService.read(
      `
        MATCH (user:User)--(deck:Deck {id: $id})--(de:Card:Divinite)--(kingdom:Kingdom)
        OPTIONAL MATCH (c:Card) WHERE c.id IN properties(deck).cards
        OPTIONAL MATCH (de)--(iDeity:CardInstance)
        OPTIONAL MATCH (c:Card)--(i:CardInstance) 
        WITH (c{.*, images: collect(i.imgSrc)}) as card, deck, de{.*, images: collect(iDeity.imgSrc)} as deity, kingdom, user
        RETURN { deck: deck{.*, deity: deity{.*, kingdomId: kingdom.id}}, cardsInfo: collect(card), creator: properties(user) }
      `,
      { id }
    );
  }

  public async create(uid: string, deityId: string, name: string) {
    return await this.neo4jService.write(
      `
        MATCH (u:User {uid: $uid})
        MATCH (c:Card:Divinite {id: $deityId})-->(k:Kingdom)
        CREATE (u)-[:HAS_BUILT]->(d:Deck {id: apoc.create.uuid(), name: $name, cards: []})-[:HAS_DEITY]->(c)
        WITH apoc.map.removeKey(c, 'search') AS deity, d AS deck, k AS kingdom
        RETURN deck{.*, deity: deity{.*, kingdom: properties(kingdom)}}
      `,
      { uid, deityId, name }
    );
  }

  public async update(uid: string, id: string, cards: any[]) {
    await this.neo4jService.write(
      `
        OPTIONAL MATCH (:User {uid: $uid})-[:HAS_BUILT]->(d:Deck {id: $id})
        SET d.cards = $cards
        RETURN d
      `,
      { uid, id, cards }
    );
    return {};
  }
}
