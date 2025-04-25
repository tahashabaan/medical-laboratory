"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const custom_error_1 = require("./custom-error");
const error_code_1 = require("../constants/error-code");
const languages_1 = require("../constants/languages");
class BadRequest extends custom_error_1.Custom {
    constructor(translates = error_code_1.ErrCodes.BAD_REQUEST, lang = languages_1.LanguageCodes.English) {
        super(translates, lang);
        this.statusCode = 400;
        this.message = translates[lang] || translates[languages_1.LanguageCodes.English];
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeError() {
        return { success: false, message: this.message, data: {} };
    }
}
exports.BadRequest = BadRequest;
