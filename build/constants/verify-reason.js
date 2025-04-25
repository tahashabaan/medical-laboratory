"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyReason = void 0;
/* eslint-disable no-unused-vars */
var VerifyReason;
(function (VerifyReason) {
    VerifyReason[VerifyReason["signup"] = 0] = "signup";
    VerifyReason[VerifyReason["updatePassword"] = 1] = "updatePassword";
    VerifyReason[VerifyReason["updatePasswordVerified"] = 2] = "updatePasswordVerified";
    VerifyReason[VerifyReason["updatePhoneNumber"] = 3] = "updatePhoneNumber";
    VerifyReason[VerifyReason["updateEmail"] = 4] = "updateEmail";
})(VerifyReason || (exports.VerifyReason = VerifyReason = {}));
