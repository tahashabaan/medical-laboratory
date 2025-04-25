import { Router } from 'express';
import * as handlers from '../controllers/roles/roles.controller';
import * as validators from '../validators/roles.validator';
import { isauthenticated } from '../guards/isauthenticated.guard';
import { isauthorized } from '../guards/isauthorized.guard';
import { PERMISSIONS } from '../constants/permissions';

const router = Router();

router.use(isauthenticated);

router
  .route('/')
  .get(isauthorized(PERMISSIONS.get_role), handlers.getRolesHandler)
  .post(isauthorized(PERMISSIONS.create_role), validators.createRole, handlers.createRoleHandler);

router
  .route('/:roleId')
  .get(isauthorized(PERMISSIONS.get_role), validators.roleParam, handlers.getOneRoleHandler)
  .patch(isauthorized(PERMISSIONS.update_role), validators.updateRole, handlers.updateRoleHandler)
  .delete(isauthorized(PERMISSIONS.remove_role), validators.roleParam, handlers.removeRoleHandler);

export const roleRoutes = router;
