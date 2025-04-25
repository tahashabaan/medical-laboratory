"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
var PERMISSIONS;
(function (PERMISSIONS) {
    // auth
    PERMISSIONS["auth"] = "auth";
    PERMISSIONS["change_password"] = "change_password";
    PERMISSIONS["update_email"] = "update_email";
    PERMISSIONS["update_profile"] = "update_profile";
    PERMISSIONS["find_users"] = "find_users";
    PERMISSIONS["update_users"] = "update_users";
    PERMISSIONS["create_nested_user"] = "create_nested_user";
    // role
    PERMISSIONS["role"] = "role";
    PERMISSIONS["create_role"] = "create_role";
    PERMISSIONS["get_role"] = "get_role";
    PERMISSIONS["update_role"] = "update_role";
    PERMISSIONS["remove_role"] = "remove_role";
})(PERMISSIONS || (exports.PERMISSIONS = PERMISSIONS = {}));
