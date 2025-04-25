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
exports.refreshUserToken = void 0;
const unauthenticated_error_1 = require("../../errors/unauthenticated-error");
const token_1 = require("../../utils/token");
const models_1 = require("../../models");
const error_code_1 = require("../../constants/error-code");
const refreshUserToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return next(new unauthenticated_error_1.Unauthenticated());
    const decoded = token_1.Tokens.verifyToken(token);
    if (!decoded)
        return next(new unauthenticated_error_1.Unauthenticated());
    const user = yield models_1.Models.User.createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.id = :id', { id: decoded.id })
        .andWhere('user.token = :token', { token })
        .select(['user', 'role.key'])
        .getOne();
    if (!user)
        return next(new unauthenticated_error_1.Unauthenticated(error_code_1.ErrCodes.INVALID_TOKEN, req.lang));
    const newToken = token_1.Tokens.generateAccessToken({
        id: user.id,
        roleId: user.role.id,
        isGuest: false,
        isVerified: user.isVerified,
        language: user.defLanguage,
        permissions: [],
        profileId: user.profile,
    });
    res
        .status(200)
        .json({ success: true, message: 'token generated', data: { access_token: newToken } });
});
exports.refreshUserToken = refreshUserToken;
