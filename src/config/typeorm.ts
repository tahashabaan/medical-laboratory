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
  migrationsRun: false,
  logging: env.nodeEnv === 'development',
  ssl: {
    rejectUnauthorized: false,
    // require: true
  },
});

export const initializeDB = async () => {
  try {
    await dataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    logger.error('Error during Data Source initialization:', error);
  }
};
