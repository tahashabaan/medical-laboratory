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
exports.authenticateGuest = void 0;
const authenticateGuest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.authenticateGuest = authenticateGuest;
