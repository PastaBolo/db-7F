export type Neo4Scheme =
  | 'neo4j'
  | 'neo4j+s'
  | 'neo4j+ssc'
  | 'bolt'
  | 'bolt+s'
  | 'bolt+ssc';

export interface Neo4jConfig {
  scheme: Neo4Scheme;
  host: string;
  port?: string | number;
  username: string;
  password: string;
  database?: string;
  disableLosslessIntegers?: string;
}
