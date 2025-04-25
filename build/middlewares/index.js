"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
// import { authentication } from './authentication.middlewares';
const error_handling_middlewares_1 = require("./error-handling.middlewares");
const route_not_found_middlewares_1 = require("./route-not-found.middlewares");
const validator_middleware_1 = require("./validator.middleware");
exports.Middlewares = {
    // authentication,
    routeNotFound: route_not_found_middlewares_1.routeNotFound,
    errorHandler: error_handling_middlewares_1.errorHandler,
    validator: validator_middleware_1.validator,
    // LanguageCodes
};
