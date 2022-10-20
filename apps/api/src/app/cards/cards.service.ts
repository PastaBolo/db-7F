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
    type,
    kingdomId,
    classId,
    abilityId,
  }: {
    type?: number;
    kingdomId?: string;
    classId?: string;
    abilityId?: string;
  }) {
    return await this.neo4jService.read(
      `
        MATCH (c:Card${this.cardType(type)})${this.byKingdom(kingdomId)}
        ${this.byClass(classId)}
        ${this.byAbility(abilityId)}
        OPTIONAL MATCH (c)--(i:CardInstance)
        WITH apoc.map.removeKey(c, 'search') as card, i
        RETURN card{.*, images: collect(i.imgSrc)}
      `
    );
  }

  private byKingdom(kingdomId: string) {
    return kingdomId ? `--(:Kingdom {id: '${kingdomId}'})` : '';
  }

  private byClass(classId: string) {
    return classId ? `MATCH (c)--(:Classe {id: '${classId}'})` : '';
  }

  private byAbility(abilityId: string) {
    return abilityId ? `MATCH (c)--(:Ability {id: '${abilityId}'})` : '';
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

  public async getClasses(kingdomId?: string) {
    return kingdomId
      ? await this.neo4jService.read(
          `
            MATCH (Kingdom {id: $kingdomId})--()--(c:Classe) 
            WITH DISTINCT c AS c 
            RETURN properties(c) ORDER BY c.name
          `,
          { kingdomId }
        )
      : await this.neo4jService.read(
          `
            MATCH (c:Classe) 
            RETURN properties(c) ORDER BY c.name
          `
        );
  }

  public async getAbilities(kingdomId?: string) {
    return kingdomId
      ? await this.neo4jService.read(
          `
            MATCH (Kingdom {id: $kingdomId})--()--(a:Ability) 
            WITH DISTINCT a AS a 
            RETURN properties(a) ORDER BY a.name
          `,
          { kingdomId }
        )
      : await this.neo4jService.read(
          `
            MATCH (a:Ability) 
            RETURN properties(a) ORDER BY a.name
          `
        );
  }

  private cardType(type: number) {
    return type && cardTypes.get(type) ? `:${cardTypes.get(type)}` : '';
  }
}
