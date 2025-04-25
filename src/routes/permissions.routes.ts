import { Router } from 'express';
import {
  getPermissionsHandler,
  getLoggedUserPermissionHandler,
} from '../controllers/roles/permissions.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';

const router = Router();
router.use(isauthenticated);

router.get('/', getPermissionsHandler);
router.get('/me', getLoggedUserPermissionHandler);

export const permissionRoutes = router;
