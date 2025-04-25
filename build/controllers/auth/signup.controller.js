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
exports.signupHandler = void 0;
const uuid_1 = require("uuid");
const errors_1 = require("../../errors");
const models_1 = require("../../models");
const env_1 = require("../../config/env");
const token_1 = require("../../utils/token");
const crypto_1 = require("../../utils/crypto");
const bcrypt_1 = require("../../utils/bcrypt");
const error_code_1 = require("../../constants/error-code");
const system_roles_1 = require("../../constants/system-roles");
const verify_reason_1 = require("../../constants/verify-reason");
const languages_1 = require("../../constants/languages");
// import { pointService } from '../points/points.service';
// import { PointReason } from '../../models/point.model';
const signupHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, uuid_1.v4)();
    const code = yield crypto_1.Crypto.generateCode(3);
    const hashedPwd = yield bcrypt_1.Bcrypt.hashPwd(req.body.password, env_1.env.bcrypt.salt, env_1.env.bcrypt.paper);
    const targetRole = yield models_1.Models.Role.findOne({
        where: {
            key: system_roles_1.SystemRoles.client,
            isCreatedBySystem: true,
        },
    });
    if (!targetRole)
        return next(new errors_1.Errors.NotFound(error_code_1.ErrCodes.ROLE_NOT_FOUND, req.lang));
    const user = yield models_1.Models.User.save({
        id: userId,
        email: req.body.email,
        password: hashedPwd,
        role: targetRole,
        verificationCode: code,
        verificationExpireAt: new Date(Date.now() + env_1.env.auth.activationCodeExpireIn),
        verificationReason: verify_reason_1.VerifyReason.signup,
        defLanguage: req.body.defLanguage || languages_1.LanguageCodes.English,
        fcmToken: req.body.fcmToken,
        country: req.body.country,
        token: token_1.Tokens.generateRefreshToken({ id: userId }),
    });
    const profile = yield models_1.Models.Profile.save({
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        name: req.body.name,
        phone: req.body.phone,
    });
    yield models_1.Models.User.update(user.id, { profile });
    const accessToken = token_1.Tokens.generateAccessToken({
        id: userId,
        isGuest: false,
        roleId: targetRole.id,
        isVerified: false,
        profileId: profile.id,
        permissions: [],
        language: req.body.defLanguage || languages_1.LanguageCodes.English,
    });
    // pointService.addPointsToHistory(user.id, PointReason.signup, req.lang);
    // res.status(201).json({
    //   success: true,
    //   message: 'User created successfully & code sent by email',
    //   data: { accessToken, refreshToken: user.token },
    // });
});
exports.signupHandler = signupHandler;
