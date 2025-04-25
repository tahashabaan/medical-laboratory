"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const custom_error_1 = require("./custom-error");
const error_code_1 = require("../constants/error-code");
const languages_1 = require("../constants/languages");
class NotFound extends custom_error_1.Custom {
    constructor(translates = error_code_1.ErrCodes.NOT_FOUND, lang = languages_1.LanguageCodes.English) {
        super(translates, lang);
        this.statusCode = 404;
        this.message = translates[lang] || translates[languages_1.LanguageCodes.English];
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    serializeError() {
        return { success: false, message: this.message, data: {} };
    }
}
exports.NotFound = NotFound;
