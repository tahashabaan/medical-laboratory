import { RequestHandler } from 'express';
import { LanguageCodes } from '../constants/languages';
import { SystemRoles } from '../constants/system-roles';
import { Models } from '../models';

export const authenticateGuest: RequestHandler = async (req, res, next) => {
  // if (req.loggedUser?.id) return next();
  // const role = await Models.Role.findOne({
  //   where: { key: SystemRoles.guest, isCreatedBySystem: true },
  // });
  // const permissions = await Models.RolePermission.find({
  //   where: { role: role! },
  //   select: ['permission'],
  //   loadRelationIds: true,
  // });
  // req.loggedUser = {
  //   roleId: role!.id,
  //   isGuest: true,
  //   permissions: permissions.map((el) => el.permission as unknown as string),
  //   language: req.lang || LanguageCodes.English,
  // };
  next();
};
