import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';

export const createRoleHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { key: string; title: string; description?: string; permissions: string[] }
> = async (req, res, next) => {
  const role = await Models.Role.save({
    key: req.body.key,
    title: req.body.title,
    description: req.body.description,
    isCreatedBySystem: false,
  });
  // if (req.body.permissions && req.body.permissions.length) {
  //   await Models.RolePermission.save(
  //     req.body.permissions.map((perm) => ({ role: { key: role.key }, permission: { key: perm } })),
  //   );
  // }
  res
    .status(201)
    .json({ success: true, message: 'role created successfully', data: { id: role.id } });
};

export const getOneRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const role = await Models.Role.createQueryBuilder('role')
    .leftJoinAndSelect('role.permissions', 'rolePermission')
    .leftJoinAndSelect('rolePermission.permission', 'permission', 'permission.parent IS NULL')
    .where('role.id = :roleId', { roleId: req.params.roleId })
    .getOne();
  res.status(200).json({ success: true, message: 'role fetched successfully', data: role });
};

export const getRolesHandler: RequestHandler<unknown, SuccessResponse, unknown> = async (
  req,
  res,
  next,
) => {
  const roles = await Models.Role.createQueryBuilder('role')
    .leftJoinAndSelect('role.permissions', 'rolePermission')
    .leftJoinAndSelect('rolePermission.permission', 'permission', 'permission.parent IS NULL')
    .getMany();
  res.status(200).json({ success: true, message: 'roles fetched successfully', data: roles });
};

export const updateRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse,
  {
    title?: string;
    description?: string;
    permissions?: string[];
  }
> = async (req, res, next) => {
  await Models.Role.createQueryBuilder()
    .update()
    .set({ title: req.body.title, description: req.body.description })
    .where('id = :roleId', { roleId: req.params.roleId })
    .execute();
  if (req.body.permissions && req.body.permissions.length) {
    const role = await Models.Role.findOne({ where: { id: req.params.roleId } });
    // await Models.RolePermission.delete({ role: { key: role!.key } });
    // await Models.RolePermission.save(
    //   req.body.permissions.map((perm) => ({
    //     role: { key: role!.key },
    //     permission: { key: perm },
    //   })),
    // );
  }
  res.status(200).json({ success: true, message: 'role updated successfully', data: null });
};

export const removeRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.Role.delete({ id: req.params.roleId });
  res.status(200).json({ success: true, message: 'role deleted successfully', data: null });
};
