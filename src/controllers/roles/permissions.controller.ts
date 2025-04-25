import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';
import { IsNull } from 'typeorm';

export const getPermissionsHandler: RequestHandler<unknown, SuccessResponse> = async (
  req,
  res,
  next,
) => {
  const permissions = await Models.Permission.find({
    where: { parent: IsNull() },
    relations: ['children', 'children.children'],
  });
  res.json({ success: true, message: 'success', data: permissions });
};

export const getLoggedUserPermissionHandler: RequestHandler<unknown, SuccessResponse> = async (
  req,
  res,
  next,
) => {
  res.json({ success: true, message: 'success', data: req.loggedUser.permissions });
};
