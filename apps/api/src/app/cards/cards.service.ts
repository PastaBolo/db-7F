import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

const cardTypes = new Map([
  [1, 'Divinite'],
  [2, 'Archange'],
  [3, 'Temple'],
  [4, 'Adorateur'],
  [5, 'Ange'],
  [6, 'Golem'],
  [7, 'Equipement'],
  [8, 'Benediction'],
  [9, 'Miracle'],
  [10, 'CadeauDivin'],
  [11, 'Familier'],
]);

@Injectable()
export class CardsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async search({
    kingdomId,
    type,
  }: {
    kingdomId?: string;
    type?: number;
  }) {
    return await this.neo4jService.read(
      `
        MATCH (c:Card${this.cardType(type)})${this.byKingdom(kingdomId)}
        OPTIONAL MATCH (c)--(i:CardInstance)
        WITH apoc.map.removeKey(c, 'search') as card, i
        RETURN card{.*, images: collect(i.imgSrc)}
      `
    );
  }
  private byKingdom(kingdomId: string) {
    return kingdomId ? `--(:Kingdom {id: '${kingdomId}'})` : '';
  }

  public async getDeities() {
    return await this.neo4jService.read(
      `
        MATCH (c:Card:Divinite)--(k:Kingdom)
        OPTIONAL MATCH (c)--(i:CardInstance)
        RETURN { id: c.id, name: c.name, kingdomId: k.id, images: collect(i.imgSrc) }
      `
    );
  }

  private cardType(type: number) {
    return type && cardTypes.get(type) ? `:${cardTypes.get(type)}` : '';
  }
}
