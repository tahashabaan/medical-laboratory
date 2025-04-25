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
exports.updateForgetenPasswordHandler = exports.askForgetPasswordHandler = void 0;
const models_1 = require("../../models");
const errors_1 = require("../../errors");
const env_1 = require("../../config/env");
const error_code_1 = require("../../constants/error-code");
const crypto_1 = require("../../utils/crypto");
const verify_reason_1 = require("../../constants/verify-reason");
const mail_1 = require("../../utils/mail");
const token_1 = require("../../utils/token");
const bcrypt_1 = require("../../utils/bcrypt");
const askForgetPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({
        where: { email: req.body.email },
        select: ['isVerified'],
    });
    if (!user)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.EMAIL_NOT_FOUND, req.lang));
    // if (user.isVerified === false)
    //   return next(new Errors.BadRequest(ErrCodes.USER_NOT_VERIFIED, req.lang));
    const code = yield crypto_1.Crypto.generateCode();
    const expirTime = new Date(Date.now() + 10 * 60 * 1000);
    yield models_1.Models.User.update({ email: req.body.email }, {
        verificationCode: crypto_1.Crypto.hashCode(code),
        verificationExpireAt: expirTime,
        verificationReason: verify_reason_1.VerifyReason.updatePassword,
    });
    res.status(200).json({
        success: true,
        message: 'Verification code has been sent to your email',
        data: {},
    });
    yield mail_1.mailTransporter.sendMail({
        to: req.body.email,
        subject: 'Forget Password',
        html: `<h1> Your verification code is ${code} </h1>`,
    });
});
exports.askForgetPasswordHandler = askForgetPasswordHandler;
const updateForgetenPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({ where: { email: req.body.email } });
    if (!user)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_CREDINTIALS));
    if (user.verificationReason !== verify_reason_1.VerifyReason.updatePasswordVerified)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.VERIFICATION_CODE_NOT_VERIFIED, req.lang));
    user.token = token_1.Tokens.generateRefreshToken({ id: user.id });
    user.password = yield bcrypt_1.Bcrypt.hashPwd(req.body.newPassword, env_1.env.bcrypt.salt, env_1.env.bcrypt.paper);
    user.verificationCode = undefined;
    user.verificationExpireAt = undefined;
    user.verificationReason = undefined;
    yield models_1.Models.User.save(user);
    return res.status(200).json({
        success: true,
        message: 'Password has been updated successfully',
        data: {},
    });
});
exports.updateForgetenPasswordHandler = updateForgetenPasswordHandler;
