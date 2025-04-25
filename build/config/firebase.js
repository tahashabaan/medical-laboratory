"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_1 = require("./env");
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: env_1.env.firebase.projectId,
            clientEmail: env_1.env.firebase.clientEmail,
            privateKey: env_1.env.firebase.privateKey,
        }),
        storageBucket: env_1.env.firebase.storageBucket,
    });
}
exports.firebaseAdmin = {};
