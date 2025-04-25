"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const custom_error_1 = require("./custom-error");
const error_code_1 = require("../constants/error-code");
const languages_1 = require("../constants/languages");
class Unauthorized extends custom_error_1.Custom {
    constructor(translates = error_code_1.ErrCodes.UNAUTHENTICATED, lang = languages_1.LanguageCodes.English) {
        super(translates, lang);
        this.statusCode = 403;
        this.message = translates[lang] || translates[languages_1.LanguageCodes.English];
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
    serializeError() {
        return { success: false, message: this.message, data: {} };
    }
}
exports.Unauthorized = Unauthorized;
