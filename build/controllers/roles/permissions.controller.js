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
exports.getLoggedUserPermissionHandler = exports.getPermissionsHandler = void 0;
const models_1 = require("../../models");
const typeorm_1 = require("typeorm");
const getPermissionsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = yield models_1.Models.Permission.find({
        where: { parent: (0, typeorm_1.IsNull)() },
        relations: ['children', 'children.children'],
    });
    res.json({ success: true, message: 'success', data: permissions });
});
exports.getPermissionsHandler = getPermissionsHandler;
const getLoggedUserPermissionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ success: true, message: 'success', data: req.loggedUser.permissions });
});
exports.getLoggedUserPermissionHandler = getLoggedUserPermissionHandler;
