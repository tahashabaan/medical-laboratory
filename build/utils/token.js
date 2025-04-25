"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = exports.isValidToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
const generateAccessToken = (payload) => (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
const generateRefreshToken = (payload) => (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: '1y' });
const verifyToken = (token) => {
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return payload;
    }
    catch (error) {
        return undefined;
    }
};
const isValidToken = (token) => {
    try {
        (0, jsonwebtoken_1.verify)(token, env_1.env.jwt.secret);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidToken = isValidToken;
exports.Tokens = { generateAccessToken, generateRefreshToken, verifyToken, isValidToken: exports.isValidToken };
