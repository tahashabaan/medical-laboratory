"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
exports.logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.simple(), winston_1.default.format.printf((info) => {
        if (info.stack) {
            return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}\n${info.stack}`;
        }
        return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.resolve('logs/logfile-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '30d',
        }),
    ],
});
