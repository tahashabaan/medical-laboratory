import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { roleRoutes } from './roles.routes';
import { permissionRoutes } from './permissions.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

export const apiRoutes = router;
