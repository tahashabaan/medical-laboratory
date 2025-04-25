"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRoleHandler = exports.updateRoleHandler = exports.getRolesHandler = exports.getOneRoleHandler = exports.createRoleHandler = void 0;
const models_1 = require("../../models");
const createRoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield models_1.Models.Role.save({
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
});
exports.createRoleHandler = createRoleHandler;
const getOneRoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield models_1.Models.Role.createQueryBuilder('role')
        .leftJoinAndSelect('role.permissions', 'rolePermission')
        .leftJoinAndSelect('rolePermission.permission', 'permission', 'permission.parent IS NULL')
        .where('role.id = :roleId', { roleId: req.params.roleId })
        .getOne();
    res.status(200).json({ success: true, message: 'role fetched successfully', data: role });
});
exports.getOneRoleHandler = getOneRoleHandler;
const getRolesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield models_1.Models.Role.createQueryBuilder('role')
        .leftJoinAndSelect('role.permissions', 'rolePermission')
        .leftJoinAndSelect('rolePermission.permission', 'permission', 'permission.parent IS NULL')
        .getMany();
    res.status(200).json({ success: true, message: 'roles fetched successfully', data: roles });
});
exports.getRolesHandler = getRolesHandler;
const updateRoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Models.Role.createQueryBuilder()
        .update()
        .set({ title: req.body.title, description: req.body.description })
        .where('id = :roleId', { roleId: req.params.roleId })
        .execute();
    if (req.body.permissions && req.body.permissions.length) {
        const role = yield models_1.Models.Role.findOne({ where: { id: req.params.roleId } });
        // await Models.RolePermission.delete({ role: { key: role!.key } });
        // await Models.RolePermission.save(
        //   req.body.permissions.map((perm) => ({
        //     role: { key: role!.key },
        //     permission: { key: perm },
        //   })),
        // );
    }
    res.status(200).json({ success: true, message: 'role updated successfully', data: null });
});
exports.updateRoleHandler = updateRoleHandler;
const removeRoleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Models.Role.delete({ id: req.params.roleId });
    res.status(200).json({ success: true, message: 'role deleted successfully', data: null });
});
exports.removeRoleHandler = removeRoleHandler;
