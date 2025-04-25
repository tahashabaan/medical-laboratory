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
exports.changePasswordHandler = void 0;
const errors_1 = require("../../errors");
const env_1 = require("../../config/env");
const models_1 = require("../../models");
const bcrypt_1 = require("../../utils/bcrypt");
const error_code_1 = require("../../constants/error-code");
const changePasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({
        where: { id: req.loggedUser.id },
        select: ['password'],
    });
    const isMatch = yield bcrypt_1.Bcrypt.comparePwd(req.body.oldPassword, user.password, env_1.env.bcrypt.paper);
    if (!isMatch)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_CREDINTIALS, req.lang));
    const hashedPwd = yield bcrypt_1.Bcrypt.hashPwd(req.body.newPassword, env_1.env.bcrypt.salt, env_1.env.bcrypt.paper);
    yield models_1.Models.User.update({ id: req.loggedUser.id }, { password: hashedPwd });
    res.send({ success: true, message: 'Password has been changed successfully', data: {} });
});
exports.changePasswordHandler = changePasswordHandler;
