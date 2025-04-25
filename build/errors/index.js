"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const bad_request_error_1 = require("./bad-request-error");
const custom_error_1 = require("./custom-error");
const data_base_connections_1 = require("./data-base-connections");
const not_allowed_error_1 = require("./not-allowed-error");
const notfound_error_1 = require("./notfound-error");
const unauthenticated_error_1 = require("./unauthenticated-error");
const unauthorized_error_1 = require("./unauthorized-error");
const validation_error_1 = require("./validation-error");
exports.Errors = {
    BadRequest: bad_request_error_1.BadRequest,
    Custom: custom_error_1.Custom,
    DatabaseConnection: data_base_connections_1.DatabaseConnection,
    NotAllowed: not_allowed_error_1.NotAllowed,
    NotFound: notfound_error_1.NotFound,
    Unauthenticated: unauthenticated_error_1.Unauthenticated,
    Unauthorized: unauthorized_error_1.Unauthorized,
    Validation: validation_error_1.Validation,
};
