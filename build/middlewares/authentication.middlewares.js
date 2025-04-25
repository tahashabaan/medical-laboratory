"use strict";
// import { RequestHandler, Request } from 'express';
// import { IjwtPayload } from '../types/jwt-payload';
// import { Tokens } from '../utils/token';
// import { Models } from '../models';
// export const authentication: RequestHandler = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return next();
//   const payload = Tokens.verifyToken(token) as IjwtPayload;
//   if (!payload) return next();
//   const RolePermissionRepo = Models.RolePermission;
//   let permissions: string[];
//   const permissionsDB = await RolePermissionRepo.find({
//     where: { role: { id: payload.roleId } },
//     select: ['permission'],
//     loadRelationIds: true,
//   });
//   permissions = permissionsDB.map((el) => el.permission as unknown as string);
//   req.loggedUser = {
//     id: payload.id,
//     isGuest: false,
//     isVerified: payload.isVerified,
//     roleId: payload.roleId,
//     permissions,
//     profileId: payload.profileId,
//     language: payload.language,
//   };
//   next();
// };
