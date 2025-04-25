import { DataSource } from 'typeorm';

import { env } from './env';
import { logger } from './winston';

export const dataSource = new DataSource({
  type: 'postgres',
  host: env.postgres.host,
  port: env.postgres.port,
  username: env.postgres.username,
  password: env.postgres.password,
  database: env.postgres.database,
  entities: [__dirname + '/../models/**/*.model.*'],
  synchronize: true,
  logging: false,
});

export const initializeDB = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    logger.error('Error during Data Source initialization:', err);
  }
};
