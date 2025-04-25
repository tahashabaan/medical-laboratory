"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.roleParam = exports.createRole = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const permissions_1 = require("../constants/permissions");
exports.createRole = [
    (0, express_validator_1.body)('key').isString(),
    (0, express_validator_1.body)('title').isString(),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('permissions').isArray(),
    (0, express_validator_1.body)('permissions.*').isIn(Object.values(permissions_1.PERMISSIONS)),
    validator_middleware_1.validator,
];
exports.roleParam = [(0, express_validator_1.param)('roleId').isUUID('4'), validator_middleware_1.validator];
exports.updateRole = [
    (0, express_validator_1.param)('roleId').isUUID('4'),
    (0, express_validator_1.body)('title').optional().isString(),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('permissions').optional().isArray(),
    (0, express_validator_1.body)('permissions.*').isIn(Object.values(permissions_1.PERMISSIONS)),
    validator_middleware_1.validator,
];
