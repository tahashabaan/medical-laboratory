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
exports.signinHandler = void 0;
const errors_1 = require("../../errors");
const models_1 = require("../../models");
const error_code_1 = require("../../constants/error-code");
const bcrypt_1 = require("../../utils/bcrypt");
const env_1 = require("../../config/env");
const token_1 = require("../../utils/token");
const languages_1 = require("../../constants/languages");
// import { pointService } from '../points/points.service';
// import { PointReason } from '../../models/point.model';
const signinHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = models_1.Models.User;
    const user = yield userRepo.findOne({ where: { email: req.body.email }, loadRelationIds: true });
    if (!user)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_CREDINTIALS, req.lang));
    const isPwdMatch = yield bcrypt_1.Bcrypt.comparePwd(req.body.password, user.password, env_1.env.bcrypt.paper);
    if (!isPwdMatch)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_CREDINTIALS, req.lang));
    if (!user.isVerified)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.USER_NOT_VERIFIED, req.lang));
    if (!user.token || !token_1.Tokens.isValidToken(user.token)) {
        const token = token_1.Tokens.generateRefreshToken({ id: user.id });
        user.token = token;
        yield userRepo.save(user);
    }
    const accessToken = token_1.Tokens.generateAccessToken({
        id: user.id,
        isGuest: false,
        isVerified: user.isVerified,
        profileId: user.profile,
        roleId: user.role,
        language: user.defLanguage || languages_1.LanguageCodes.English,
    });
    // pointService.addPointsToHistory(user.id, PointReason.dailySignin, req.lang);
    // res.status(200).json({
    //   success: true,
    //   message: 'signin successfully',
    //   data: { access_token: accessToken, refresh_token: user.token },
    // });
});
exports.signinHandler = signinHandler;
