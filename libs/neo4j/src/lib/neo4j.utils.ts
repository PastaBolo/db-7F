import { ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';

import { Neo4jConfig } from './neo4j-config.interface';

export const createConfig = (
  configService: ConfigService,
  customConfig?: Neo4jConfig
): Neo4jConfig =>
  customConfig || {
    host: configService.get('DATABASE_HOST'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    scheme: configService.get('DATABASE_SCHEME'),
    username: configService.get('DATABASE_USERNAME'),
    disableLosslessIntegers: configService.get('DISABLE_LOSS_LESS_INTEGERS'),
  };

export const createDriver = async (config: Neo4jConfig) => {
  const { host, scheme, port, username, password, disableLosslessIntegers } =
    config;
  const driver = neo4j.driver(
    port ? `${scheme}://${host}:${port}` : `${scheme}://${host}`,
    neo4j.auth.basic(username, password),
    { disableLosslessIntegers: !!disableLosslessIntegers }
  );
  // await driver.verifyConnectivity();
  return driver;
};
