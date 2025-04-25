"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
const validation_error_1 = require("../errors/validation-error");
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    req.body = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
    req.params = (0, express_validator_1.matchedData)(req, { locations: ['params'] });
    req.query = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
    if (!errors.isEmpty())
        return next(new validation_error_1.Validation(errors.array()));
    next();
};
exports.validator = validator;
