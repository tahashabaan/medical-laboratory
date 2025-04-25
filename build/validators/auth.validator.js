"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.changeEmail = exports.updateForgottenPassword = exports.askForgetPassword = exports.refreshUserToken = exports.signin = exports.signup = exports.resendVerification = exports.resendVerify = exports.verify = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const languages_1 = require("../constants/languages");
exports.verify = [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('code').isString(), validator_middleware_1.validator];
exports.resendVerify = [(0, express_validator_1.body)('email').isEmail(), validator_middleware_1.validator];
exports.resendVerification = [(0, express_validator_1.body)('email').isEmail(), validator_middleware_1.validator];
exports.signup = [
    (0, express_validator_1.body)('name').isString(),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString(),
    (0, express_validator_1.body)('phone').isMobilePhone('any'),
    (0, express_validator_1.body)('defLanguage').optional().isIn(Object.values(languages_1.LanguageCodes)),
    (0, express_validator_1.body)('fcmToken').optional().isString(),
    (0, express_validator_1.body)('country')
        .isString()
        .bail()
        .customSanitizer((value) => ({ code: value })),
    (0, express_validator_1.body)('city').optional().isString(),
    (0, express_validator_1.body)('state').optional().isString(),
    (0, express_validator_1.body)('postalCode').optional().isNumeric().bail().toInt(),
    validator_middleware_1.validator,
];
exports.signin = [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), validator_middleware_1.validator];
exports.refreshUserToken = [(0, express_validator_1.header)('Authorization').isString(), validator_middleware_1.validator];
exports.askForgetPassword = [(0, express_validator_1.body)('email').isEmail(), validator_middleware_1.validator];
exports.updateForgottenPassword = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('newPassword').isString(),
    validator_middleware_1.validator,
];
exports.changeEmail = [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), validator_middleware_1.validator];
exports.changePassword = [
    (0, express_validator_1.body)('oldPassword').isString(),
    (0, express_validator_1.body)('newPassword').isString(),
    validator_middleware_1.validator,
];
