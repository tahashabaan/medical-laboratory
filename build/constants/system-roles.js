"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemRolesPermissions = exports.SystemRoles = void 0;
const permissions_1 = require("./permissions");
var SystemRoles;
(function (SystemRoles) {
    SystemRoles["admin"] = "admin";
    SystemRoles["provider"] = "provider";
    SystemRoles["client"] = "client";
    SystemRoles["guest"] = "guest";
})(SystemRoles || (exports.SystemRoles = SystemRoles = {}));
const allPermissions = Object.values(permissions_1.PERMISSIONS);
exports.SystemRolesPermissions = {
    [SystemRoles.admin]: allPermissions,
    [SystemRoles.provider]: allPermissions,
    [SystemRoles.client]: allPermissions,
    [SystemRoles.guest]: allPermissions,
};
