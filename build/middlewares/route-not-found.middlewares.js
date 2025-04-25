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
exports.routeNotFound = void 0;
const errors_1 = require("../errors");
const error_code_1 = require("../constants/error-code");
const routeNotFound = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return next(new errors_1.Errors.NotFound(error_code_1.ErrCodes.ROUTE_NOT_FOUND));
});
exports.routeNotFound = routeNotFound;
