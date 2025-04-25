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
exports.isverified = void 0;
const isverified = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUser = req.loggedUser;
    // if (!loggedUser.isVerified) return next(new Errors.Unauthorized(ErrCodes.VERIFY_YOUR_ACCOUNT));
    next();
});
exports.isverified = isverified;
