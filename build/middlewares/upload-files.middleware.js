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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMemoryStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const bad_request_error_1 = require("../errors/bad-request-error");
const error_code_1 = require("../constants/error-code");
const uuid_1 = require("uuid");
const uploadMemoryStorage = (options) => (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: (options === null || options === void 0 ? void 0 : options.maxSize) || 3000 * 1024 * 1024 }, // 3MB
    fileFilter: (options === null || options === void 0 ? void 0 : options.fileFilter)
        ? options.fileFilter
        : function fileFilter(req, file, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    file.filename = `${(0, uuid_1.v4)()}.${file.originalname.split('.').at(-1)}`;
                    const allowedTypes = (options === null || options === void 0 ? void 0 : options.fileType) || ['image'];
                    const isAllowedType = allowedTypes.some((allowedType) => file.mimetype.startsWith(allowedType));
                    if (!isAllowedType)
                        return callback(new bad_request_error_1.BadRequest(error_code_1.ErrCodes.INVALID_FILE_FORMAT));
                    callback(null, true);
                }
                catch (error) {
                    console.log(error);
                    return callback(new bad_request_error_1.BadRequest(error_code_1.ErrCodes.INVALID_FILE_FORMAT));
                }
            });
        },
});
exports.uploadMemoryStorage = uploadMemoryStorage;
