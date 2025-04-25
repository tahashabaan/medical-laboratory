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
exports.askChangeEmailHandler = void 0;
const errors_1 = require("../../errors");
const models_1 = require("../../models");
const bcrypt_1 = require("../../utils/bcrypt");
const error_code_1 = require("../../constants/error-code");
const crypto_1 = require("../../utils/crypto");
const verify_reason_1 = require("../../constants/verify-reason");
const mail_1 = require("../../utils/mail");
const askChangeEmailHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.Models.User.findOne({
        where: { id: req.loggedUser.id },
        select: ['password'],
    });
    const isMatch = yield bcrypt_1.Bcrypt.comparePwd(req.body.password, user.password);
    if (!isMatch)
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.INVALID_CREDINTIALS, req.lang));
    if (yield models_1.Models.User.findOne({ where: { email: req.body.email } }))
        return next(new errors_1.Errors.BadRequest(error_code_1.ErrCodes.EMAIL_ALREADY_EXISTS, req.lang));
    const code = yield crypto_1.Crypto.generateCode();
    const expirTime = new Date(Date.now() + 10 * 60 * 1000);
    yield models_1.Models.User.update({ id: req.loggedUser.id }, {
        verificationCode: crypto_1.Crypto.hashCode(code),
        verificationExpireAt: expirTime,
        verificationReason: verify_reason_1.VerifyReason.updateEmail,
        verificationTempEmail: req.body.email,
    });
    res.status(200).json({
        success: true,
        message: 'Verification code has been sent to your new email',
        data: {},
    });
    yield mail_1.mailTransporter.sendMail({
        to: req.body.email,
        subject: 'Email Verification',
        html: `<h1> Your verification code is ${code} </h1>`,
    });
});
exports.askChangeEmailHandler = askChangeEmailHandler;
