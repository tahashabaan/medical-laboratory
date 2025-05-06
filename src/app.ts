import 'express-async-errors';
import './types/custom-definition';

import cors from 'cors';
import express from 'express';

import { checkEnvVariables, env } from './config/env';
import { Middlewares } from './middlewares';
import { apiRoutes } from './routes';
import { homeRoutes } from './routes/home.routes';
import { LanguageCodes } from './constants/languages';
import { SystemRoles } from './constants/system-roles';
import { Models } from './models';
import { setupSwagger } from './middlewares/swagger.middleware';

export const app = express();

// checkEnvVariables();
app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin: env.frontUrl }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static('uploads/images'));

// Set up Swagger documentation
setupSwagger(app);

// app.use('/', (req, res) => {
//   res.json({ message: 'API is running' });
// });

app.use('/api/v1', apiRoutes);
app.use('*', Middlewares.routeNotFound);
app.use(Middlewares.errorHandler);


