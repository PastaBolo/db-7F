import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

@Injectable()
export class DecksService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async get(id: string) {
    return await this.neo4jService.read(
      `
        MATCH (user:User)--(deck:Deck {id: $id})--(de:Card:Divinite)--(kingdom:Kingdom)
        OPTIONAL MATCH (c:Card)--(i:CardInstance) WHERE (c.id IN properties(deck).cards) OR (c.id IN properties(deck).side)
        WITH c{.*, images: collect(i.imgSrc)} as card, deck, de, kingdom, user
        WITH collect(card) as cards, deck, de, kingdom, user
        OPTIONAL MATCH (de)--(iDeity:CardInstance)
        WITH de{.*, images: collect(iDeity.imgSrc)} as deity, deck, cards, kingdom, user
        RETURN { deck: deck{.*, private:  apoc.label.exists(deck, "Private"), deity: deity{.*, kingdomId: kingdom.id}}, cardsInfo: cards, creator: properties(user) }
        `,
      { id }
    );
  }

  public async search({ deityId }: { deityId?: string }) {
    return await this.neo4jService.read(
      `
        MATCH (u:User)-[:HAS_BUILT]->(d:Deck)-[:HAS_DEITY]->(:Divinite {id: $deityId})
        WHERE NOT d:Private
        RETURN { id: d.id, name: d.name, user: properties(u) }
      `,
      { deityId }
    );
  }

  public async create(uid: string, deityId: string) {
    return await this.neo4jService.write(
      `
        MATCH (u:User {uid: $uid})
        MATCH (c:Card:Divinite {id: $deityId})-->(k:Kingdom)
        CREATE (u)-[:HAS_BUILT]->(d:Deck:Private {id: apoc.create.uuid(), name: 'Nouveau Deck', cards: [], side: []})-[:HAS_DEITY]->(c)
        WITH apoc.map.removeKey(c, 'search') AS deity, d AS deck, k AS kingdom
        RETURN deck{.*, private:  apoc.label.exists(deck, "Private"), deity: deity{.*, kingdom: properties(kingdom)}}
      `,
      { uid, deityId }
    );
  }

  public async update(uid: string, id: string, cards: any[], side: any[]) {
    await this.neo4jService.write(
      `
        OPTIONAL MATCH (:User {uid: $uid})-[:HAS_BUILT]->(d:Deck {id: $id})
        SET d.cards = $cards
        SET d.side = $side
        RETURN d
      `,
      { uid, id, cards, side }
    );
    return {};
  }

  public async updateSettings(
    uid: string,
    id: string,
    settings: { name: string; private: boolean }
  ) {
    await this.neo4jService.write(
      `
        OPTIONAL MATCH (:User {uid: $uid})-[:HAS_BUILT]->(d:Deck {id: $id})
        SET d.name = $settings.name
        ${settings.private ? 'SET d :Private' : 'REMOVE d :Private'}
        RETURN d
      `,
      { uid, id, settings }
    );
    return {};
  }

  public async updateDeity(uid: string, id: string, deityId: string) {
    await this.neo4jService.write(
      `
        MATCH (:User {uid: $uid})-[:HAS_BUILT]->(d:Deck {id: $id})-[r:HAS_DEITY]->()
        DELETE r
        WITH d
        MATCH (c:Card:Divinite {id: $deityId})
        MERGE (d)-[:HAS_DEITY]->(c)
        RETURN d
      `,
      { uid, id, deityId }
    );
    return {};
  }

  public async delete(id: string, uid: string) {
    await this.neo4jService.write(
      `
        OPTIONAL MATCH (:User {uid: $uid})-[:HAS_BUILT]->(d:Deck {id: $id})
        DETACH DELETE d
      `,
      { uid, id }
    );
    return {};
  }
}
