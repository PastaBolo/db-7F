import { BadRequestException, Injectable } from '@nestjs/common';
import { Neo4jService } from '@seven-fallen/neo4j';

const cardTypeMap = new Map([
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
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) {}

  public async getCards(params: { type: number }) {
    // return await this.neo4jService.read(
    //   `MATCH (c:Card${this.cardType(params.type)})`
    //   );
  }

  // private cardType(type: number) {
  //   return type && cardTypeMap.get(type) ? `:${cardTypeMap.get(type)}` : '';
  // }
}
