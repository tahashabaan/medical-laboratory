"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
require("./types/custom-definition");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const middlewares_1 = require("./middlewares");
exports.app = (0, express_1.default)();
// checkEnvVariables();
exports.app.use(express_1.default.json({ limit: '5mb' }));
exports.app.use((0, cors_1.default)({ origin: env_1.env.frontUrl }));
exports.app.use(express_1.default.urlencoded({ limit: '5mb', extended: true }));
exports.app.use(express_1.default.static('uploads/images'));
// app.route('/api/v1', async (req: express.Request, res: express.Response): Promise<void> => {
//     res.json({ message: 'API is running' });
// });
exports.app.get('/', (req, res) => {
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
exports.app.use('*', middlewares_1.Middlewares.routeNotFound);
exports.app.use(middlewares_1.Middlewares.errorHandler);
