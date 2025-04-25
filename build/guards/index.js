"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guards = void 0;
const isauthenticated_guard_1 = require("./isauthenticated.guard");
const isauthorized_guard_1 = require("./isauthorized.guard");
const isverified_guard_1 = require("./isverified.guard");
exports.Guards = {
    isauthorized: isauthorized_guard_1.isauthorized,
    isauthenticated: isauthenticated_guard_1.isauthenticated,
    isverified: isverified_guard_1.isverified,
};
