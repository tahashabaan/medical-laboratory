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
exports.mailTransporter = void 0;
const nodemailer_1 = require("nodemailer");
const winston_1 = require("../config/winston");
const env_1 = require("../config/env");
class MailTransporter {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: +process.env.MAIL_PORT,
            auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
            secure: process.env.NODE_ENV === 'production',
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    verifyTransporter() {
        this.transporter.verify(function (error, success) {
            if (error) {
                winston_1.logger.error(error);
            }
            else {
                winston_1.logger.info('email transporter verified', success);
            }
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: env_1.env.mail.user,
                to: options.to,
                subject: options.subject,
                html: options.html,
            });
        });
    }
}
exports.mailTransporter = new MailTransporter();
