import { app } from './app';
import { initializeDB } from './config/typeorm';
import serverless from 'serverless-http';

let isDbInitialized = false;

const initialize = async () => {
  if (!isDbInitialized) {
    await initializeDB();
    isDbInitialized = true;
  }
};

export const handler = async (event: any, context: any) => {
  await initialize();
  const serverlessHandler = serverless(app);
  return serverlessHandler(event, context);
};

// For local development (optional)
if (process.env.IS_OFFLINE || process.env.NODE_ENV == 'development') {
  initialize().then(() => {
    const { env } = require('./config/env');
    app.listen(env.port, () => {
      console.log(`server is running on port ${env.port} in environment ${env.environment}`);
      console.log(`local url: http://localhost:${env.port}/api-docs`);
      console.log('Server is ready to accept requests');
    });
  });
}