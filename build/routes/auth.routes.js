"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const handlers = __importStar(require("../controllers/auth"));
const validators = __importStar(require("../validators/auth.validator"));
const isauthenticated_guard_1 = require("../guards/isauthenticated.guard");
const isauthorized_guard_1 = require("../guards/isauthorized.guard");
const permissions_1 = require("../constants/permissions");
const router = (0, express_1.Router)();
router.post('/signup', validators.signup, handlers.signupHandler);
router.post('/signin', validators.signin, handlers.signinHandler);
router.post('/verify', validators.verify, handlers.verifyHandler);
router.post('/resend-code', validators.resendVerify, handlers.resendVerificationCode);
router.post('/change-password', isauthenticated_guard_1.isauthenticated, validators.changePassword, handlers.changePasswordHandler);
router.post('/change-email', isauthenticated_guard_1.isauthenticated, (0, isauthorized_guard_1.isauthorized)(permissions_1.PERMISSIONS.update_email), validators.changeEmail, handlers.askChangeEmailHandler);
router.post('/refresh-token', validators.refreshUserToken, handlers.refreshUserToken);
router
    .route('/forget-password')
    .post(validators.askForgetPassword, handlers.askForgetPasswordHandler)
    .patch(validators.updateForgottenPassword, handlers.updateForgetenPasswordHandler);
exports.authRoutes = router;
