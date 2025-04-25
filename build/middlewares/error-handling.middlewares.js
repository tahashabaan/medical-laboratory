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
exports.errorHandler = void 0;
const multer_1 = require("multer");
const winston_1 = require("../config/winston");
const custom_error_1 = require("../errors/custom-error");
const typeorm_1 = require("typeorm");
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'development')
        console.log(err);
    if (err instanceof custom_error_1.Custom) {
        return res.status(err.statusCode).json(err.serializeError());
    }
    if (err instanceof multer_1.MulterError)
        return res.status(400).json({ errors: [{ message: `${err.field} is invalid` }] });
    if (err instanceof typeorm_1.QueryFailedError) {
        winston_1.logger.error('QueryFailedError');
        winston_1.logger.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null,
        });
    }
    winston_1.logger.error(err);
    res.status(500).json({ errors: [{ message: 'server error' }] });
});
exports.errorHandler = errorHandler;
