"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const custom_error_1 = require("./custom-error");
const error_code_1 = require("../constants/error-code");
class Validation extends custom_error_1.Custom {
    // eslint-disable-next-line no-unused-vars
    constructor(error) {
        super(error_code_1.ErrCodes.VALIDATION_ERROR);
        this.error = error;
        this.statusCode = 422;
        this.message = 'VALIDATION_ERROR';
        Object.setPrototypeOf(this, Validation.prototype);
    }
    serializeError() {
        return {
            success: false,
            message: this.message,
            data: {},
            errors: this.error.map((el) => {
                if (el.type === 'field')
                    return { message: el.msg, field: el.path };
                return { message: el.msg };
            }),
        };
    }
}
exports.Validation = Validation;
