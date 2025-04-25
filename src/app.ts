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


export const app = express();

// checkEnvVariables();
app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin: env.frontUrl }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static('uploads/images'));

// app.route('/api/v1', async (req: express.Request, res: express.Response): Promise<void> => {
//     res.json({ message: 'API is running' });
// });
app.get('/', (req, res) => {
  res.send('API is running');
});



// app.use('/', homeRoutes);
// app.use(Middlewares.LanguageCodes);

// Comment out the authentication middleware
// app.use(Middlewares.authentication);

// Add a mock authentication middleware that sets a default admin user
// app.use(async (req, res, next) => {
//   const adminRole = await Models.Role.findOne({
//     where: { key: SystemRoles.admin },
//   });
  
//   if (adminRole) {
//     const permissions = await Models.RolePermission.find({
//       where: { role: { id: adminRole.id } },
//       select: ['permission'],
//       loadRelationIds: true,
//     });
    
//     req.loggedUser = {
//       id: '00000000-0000-0000-0000-000000000000', // Mock user ID
//       isGuest: false,
//       isVerified: true,
//       roleId: adminRole.id,
//       permissions: permissions.map((el) => el.permission as unknown as string),
//       language: LanguageCodes.English,
//     };
//   }
//   next();
// });

// app.use('/api/v1', apiRoutes);
app.use('*', Middlewares.routeNotFound);
app.use(Middlewares.errorHandler);


