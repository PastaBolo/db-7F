import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import neo4j, { Driver, Result, int, Transaction } from 'neo4j-driver';
import TransactionImpl from 'neo4j-driver-core/lib/transaction';

import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.tokens';
import { Neo4jConfig } from './neo4j-config.interface';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  private readonly driver: Driver;
  private readonly config: Neo4jConfig;

  constructor(
    @Inject(NEO4J_CONFIG) config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) driver: Driver
  ) {
    this.driver = driver;
    this.config = config;
  }

  public onApplicationShutdown() {
    return this.driver.close();
  }

  public getDriver(): Driver {
    return this.driver;
  }

  public getConfig(): Neo4jConfig {
    return this.config;
  }

  public int(value: number) {
    return int(value);
  }

  public beginTransaction(database?: string): Transaction {
    const session = this.getWriteSession(database);

    return session.beginTransaction();
  }

  public getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  public getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  public read(
    cypher: string,
    params?: Record<string, any>,
    databaseOrTransaction?: string | Transaction
  ): Result {
    if (databaseOrTransaction instanceof TransactionImpl) {
      return (<Transaction>databaseOrTransaction).run(cypher, params);
    }

    const session = this.getReadSession(<string>databaseOrTransaction);
    return session.run(cypher, params);
  }

  public write(
    cypher: string,
    params?: Record<string, any>,
    databaseOrTransaction?: string | Transaction
  ): Result {
    if (databaseOrTransaction instanceof TransactionImpl) {
      return (<Transaction>databaseOrTransaction).run(cypher, params);
    }

    const session = this.getWriteSession(<string>databaseOrTransaction);
    return session.run(cypher, params);
  }
}
