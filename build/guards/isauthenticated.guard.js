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
exports.isauthenticated = void 0;
const errors_1 = require("../errors");
const isauthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedUser = req.loggedUser;
    if (!(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id))
        return next(new errors_1.Errors.Unauthenticated());
    next();
});
exports.isauthenticated = isauthenticated;
