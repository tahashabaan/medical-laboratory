"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashCode = (code) => crypto_1.default.createHash('sha256').update(code).digest('hex');
const generateCode = (length = 3) => new Promise((resolve, reject) => {
    crypto_1.default.randomBytes(length, (err, buffer) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(buffer.toString('hex'));
        }
    });
});
exports.Crypto = { hashCode, generateCode };
