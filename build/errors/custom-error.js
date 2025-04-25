"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Custom = void 0;
const languages_1 = require("../constants/languages");
class Custom extends Error {
    constructor(translates, lang = languages_1.LanguageCodes.English) {
        super(lang);
        Object.setPrototypeOf(this, Custom.prototype);
    }
}
exports.Custom = Custom;
