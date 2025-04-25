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
exports.initializeDB = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const winston_1 = require("./winston");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.postgres.host,
    port: env_1.env.postgres.port,
    username: env_1.env.postgres.username,
    password: env_1.env.postgres.password,
    database: env_1.env.postgres.database,
    entities: [__dirname + '/../models/**/*.model.*'],
    synchronize: true,
    logging: false,
});
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.dataSource.initialize();
        console.log('Data Source has been initialized!');
    }
    catch (err) {
        console.error('Error during Data Source initialization:', err);
        winston_1.logger.error('Error during Data Source initialization:', err);
    }
});
exports.initializeDB = initializeDB;
