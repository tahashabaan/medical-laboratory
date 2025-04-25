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
exports.resendVerificationCode = exports.verifyHandler = void 0;
const errors_1 = require("../../errors");
const models_1 = require("../../models");
const error_code_1 = require("../../constants/error-code");
const crypto_1 = require("../../utils/crypto");
const verify_reason_1 = require("../../constants/verify-reason");
const mail_1 = require("../../utils/mail");
const env_1 = require("../../config/env");
const isExpired = (date) => {
    const currentTime = Date.now();
    const expireTime = date.getTime();
    return currentTime > expireTime;
};
const verifyHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({ where: { email: req.body.email } });
    if (!user)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_VERIFICATION_CODE, req.lang));
    if (!user.verificationReason && user.isVerified)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.NO_REASON_TO_VERIFY, req.lang));
    if (env_1.env.environment !== 'development')
        if (user.verificationCode !== crypto_1.Crypto.hashCode(req.body.code))
            if (user.verificationExpireAt && isExpired(new Date(user.verificationExpireAt || 0)))
                return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.EXPIRED_CODE, req.lang));
    let responseData = {};
    let updateDate = {
        verificationCode: undefined,
        verificationExpireAt: undefined,
        verificationTempEmail: undefined,
    };
    // user ask update his forgeten password
    if (user.verificationReason === verify_reason_1.VerifyReason.updatePassword) {
        yield models_1.Models.User.update({ id: user.id }, { verificationReason: verify_reason_1.VerifyReason.updatePasswordVerified });
    }
    // user verify his account
    else if (user.verificationReason === verify_reason_1.VerifyReason.signup) {
        updateDate.isVerified = true;
        updateDate.verificationReason = undefined;
    }
    // user update his email
    else if (user.verificationReason === verify_reason_1.VerifyReason.updateEmail) {
        updateDate.verificationCode = undefined;
        updateDate.email = user.verificationTempEmail;
        if (!user.verificationTempEmail)
            return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_DATA, req.lang));
    }
    yield models_1.Models.User.update({ id: user.id }, updateDate);
    res.status(200).json({ success: true, message: 'User has been verified', data: responseData });
});
exports.verifyHandler = verifyHandler;
const resendVerificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({
        where: { email: req.body.email },
    });
    if (!user)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.NO_REASON_TO_RESEND_CODE, req.lang));
    const currentTime = Date.now();
    const expireTime = new Date(user.verificationExpireAt || '0').getTime();
    const remainingTimeToResendInSec = Math.floor((expireTime - currentTime) / 1000);
    if (user.verificationReason === null || user.verificationReason === undefined)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.NO_REASON_TO_RESEND_CODE, req.lang));
    if (currentTime < expireTime)
        return res.status(200).json({
            success: false,
            message: 'You have to wait before sending the code again',
            data: {
                remainingTime: remainingTimeToResendInSec,
            },
        });
    const expireAt = new Date(Date.now() + 10 * 60 * 1000);
    const code = yield crypto_1.Crypto.generateCode();
    yield models_1.Models.User.update({ id: user.id }, { verificationCode: crypto_1.Crypto.hashCode(code), verificationExpireAt: expireAt });
    res.status(200).json({
        success: true,
        message: 'Code sent Successfully',
        data: {
            expireAt,
            reason: verify_reason_1.VerifyReason[user.verificationReason],
        },
    });
    yield mail_1.mailTransporter.sendMail({
        to: user.email,
        subject: 'Verification Code',
        html: `<p>Your verification code is: ${code}</p>`,
    });
});
exports.resendVerificationCode = resendVerificationCode;
