// import './config/firebase';
// import './config/s3';

import { app } from './app';
import { env } from './config/env';
// import { initializeDB } from './config/typeorm';

const start = async () => {
  // await initializeDB();
  app.listen(env.port, () => {
    console.log(`server is running on port ${env.port} in envronment ${env.environment}`);
    console.log(`local url: http://localhost:${env.port}`);
  });
};

start();
