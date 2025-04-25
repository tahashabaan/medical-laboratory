"use strict";
// import './config/firebase';
// import './config/s3';
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
const app_1 = require("./app");
const env_1 = require("./config/env");
// import { initializeDB } from './config/typeorm';
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // await initializeDB();
    app_1.app.listen(env_1.env.port, () => {
        console.log(`server is running on port ${env_1.env.port} in envronment ${env_1.env.environment}`);
        console.log(`local url: http://localhost:${env_1.env.port}`);
    });
});
start();
