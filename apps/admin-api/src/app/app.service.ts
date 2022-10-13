import { Injectable, BadRequestException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as neo4j from 'neo4j-driver';

import config from '../bucket-access.config';
import bucketName from '../bucket-name';

@Injectable()
export class AppService {
  private readonly bucket = new Storage({
    projectId: config.project_id,
    credentials: {
      client_email: config.client_email,
      private_key: config.private_key,
    },
  }).bucket(bucketName);

  private readonly session = neo4j
    .driver(
      'neo4j+s://88322ff8.databases.neo4j.io',
      neo4j.auth.basic('neo4j', 'C7C4l4f04lLFpddbArtEIrZxq2aDke6sjhOA3jBDlt8')
    )
    .session();

  public async search(search: string) {
    return await this.session
      .run(
        'MATCH (c:Card) WHERE c.search CONTAINS $search RETURN collect({id: c.id, name: c.name, type: c.type})',
        {
          search,
        }
      )
      .then((res) => res.records[0].get(0));
  }

  public async upload(
    file: Express.Multer.File,
    edition: string,
    id: string,
    number: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const blob = this.bucket.file(`${edition}_${number}.jpg`);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', () => {
        reject(new BadRequestException());
      });

      blobStream.on('finish', () => {
        const url = `${blob.name}`;
        try {
          this.session.executeWrite((tx) =>
            tx.run(
              `MATCH (c:Card {id: $id}), (e:Edition {acronym: $edition}) 
             MERGE (c)<-[:INSTANCE_OF]-(i:CardInstance)-[:APPEARS_IN]->(e)
             SET i.id = apoc.create.uuid()
             SET i.imgSrc = $url
            `,
              { id, edition, url }
            )
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      blobStream.end(file.buffer);
    });
  }
}
