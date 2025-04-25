import { body, param } from 'express-validator';
import { validator } from '../middlewares/validator.middleware';
import { PERMISSIONS } from '../constants/permissions';

export const createRole = [
  body('key').isString(),
  body('title').isString(),
  body('description').optional().isString(),
  body('permissions').isArray(),
  body('permissions.*').isIn(Object.values(PERMISSIONS)),
  validator,
];

export const roleParam = [param('roleId').isUUID('4'), validator];

export const updateRole = [
  param('roleId').isUUID('4'),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('permissions').optional().isArray(),
  body('permissions.*').isIn(Object.values(PERMISSIONS)),
  validator,
];
