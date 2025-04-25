"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrCodes = exports.ERR_CODES = void 0;
const languages_1 = require("./languages");
var ERR_CODES;
(function (ERR_CODES) {
    ERR_CODES["notFound"] = "NOT_FOUND";
    ERR_CODES["badRequest"] = "BAD_REQUEST";
    ERR_CODES["databaseConnection"] = "DATABASE_CONNECTION";
    ERR_CODES["notAllowed"] = "NOT_ALLOWED";
    ERR_CODES["unauthorized"] = "UNAUTHORIZED";
    ERR_CODES["validationError"] = "VALIDATION_ERROR";
    ERR_CODES["verifyYourAccount"] = "VERIFY_YOUR_ACCOUNT";
    ERR_CODES["routeNotFound"] = "ROUTE_NOT_FOUND";
    ERR_CODES["fileNotFoundOnBucket"] = "FILE_NOT_FOUND_ON_BUCKET";
    ERR_CODES["invalidFileFormat"] = "INVALID_FILE_FORMAT";
    ERR_CODES["INVALID_CREDINTIALS"] = "INVALID_CREDINTIALS";
    ERR_CODES["USER_NOT_VERIFIED"] = "USER_NOT_VERIFIED";
    ERR_CODES["ROLE_NOT_FOUND"] = "ROLE_NOT_FOUND";
    ERR_CODES["INVALID_VERIFICATION_CODE"] = "INVALID_VERIFICATION_CODE";
    ERR_CODES["NO_REASON_TO_VERIFY"] = "NO_REASON_TO_VERIFY";
    ERR_CODES["EXPIRED_CODE"] = "EXPIRED_CODE";
    ERR_CODES["INVALID_DATA"] = "INVALID_DATA";
    ERR_CODES["NO_REASON_TO_RESEND_CODE"] = "NO_REASON_TO_RESEND_CODE";
    ERR_CODES["EMAIL_ALREADY_EXISTS"] = "EMAIL_ALREADY_EXISTS";
    ERR_CODES["EMAIL_NOT_FOUND"] = "EMAIL_NOT_FOUND";
    ERR_CODES["VERIFICATION_CODE_NOT_VERIFIED"] = "VERIFICATION_CODE_NOT_VERIFIED";
    ERR_CODES["INVALID_TOKEN"] = "INVALID_TOKEN";
    ERR_CODES["ACTION_ALREADY_DONE"] = "ACTION_ALREADY_DONE";
    ERR_CODES["UNAUTHENTICATED"] = "UNAUTHENTICATED";
    ERR_CODES["CANT_REMOVE_ALL_PRODUCT_RESOURCES"] = "CANT_REMOVE_ALL_PRODUCT_RESOURCES";
    ERR_CODES["PRODUCT_NOT_FOUND"] = "PRODUCT_NOT_FOUND";
    ERR_CODES["RATING_NOT_FOUND"] = "RATING_NOT_FOUND";
    ERR_CODES["RATING_ALREADY_EXISTS"] = "RATING_ALREADY_EXISTS";
    ERR_CODES["POINT_NOT_FOUND"] = "POINT_NOT_FOUND";
})(ERR_CODES || (exports.ERR_CODES = ERR_CODES = {}));
exports.ErrCodes = {
    CANT_REMOVE_ALL_PRODUCT_RESOURCES: {
        [languages_1.LanguageCodes.English]: "Can't remove all product resources",
        [languages_1.LanguageCodes.Arabic]: 'لا يمكن إزالة جميع محتويات المنتج',
    },
    UNAUTHENTICATED: {
        [languages_1.LanguageCodes.English]: 'Unauthenticated',
        [languages_1.LanguageCodes.Arabic]: 'غير مصادق عليه',
    },
    ACTION_ALREADY_DONE: {
        [languages_1.LanguageCodes.English]: 'Action Already Done',
        [languages_1.LanguageCodes.Arabic]: 'الإجراء تم بالفعل',
    },
    INVALID_TOKEN: {
        [languages_1.LanguageCodes.English]: 'Invalid Token',
        [languages_1.LanguageCodes.Arabic]: 'الرمز غير صالح',
    },
    VERIFICATION_CODE_NOT_VERIFIED: {
        [languages_1.LanguageCodes.English]: 'Verification Code Not Verified',
        [languages_1.LanguageCodes.Arabic]: 'رمز التحقق غير موثق',
    },
    EMAIL_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Email Not Found',
        [languages_1.LanguageCodes.Arabic]: 'البريد الإلكتروني غير موجود',
    },
    EMAIL_ALREADY_EXISTS: {
        [languages_1.LanguageCodes.English]: 'Email Already Exists',
        [languages_1.LanguageCodes.Arabic]: 'البريد الإلكتروني موجود بالفعل',
    },
    NO_REASON_TO_RESEND_CODE: {
        [languages_1.LanguageCodes.English]: 'No Reason To Resend Code',
        [languages_1.LanguageCodes.Arabic]: 'لا يوجد سبب لإعادة إرسال الرمز',
    },
    INVALID_DATA: {
        [languages_1.LanguageCodes.English]: 'Invalid Data',
        [languages_1.LanguageCodes.Arabic]: 'بيانات غير صالحة',
    },
    EXPIRED_CODE: {
        [languages_1.LanguageCodes.English]: 'Expired Code',
        [languages_1.LanguageCodes.Arabic]: 'الرمز منتهي الصلاحية',
    },
    NO_REASON_TO_VERIFY: {
        [languages_1.LanguageCodes.English]: 'No Reason To Verify',
        [languages_1.LanguageCodes.Arabic]: 'لا يوجد سبب للتحقق',
    },
    INVALID_VERIFICATION_CODE: {
        [languages_1.LanguageCodes.English]: 'Invalid Verification Code',
        [languages_1.LanguageCodes.Arabic]: 'رمز التحقق غير صالح',
    },
    ROLE_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Role Not Found',
        [languages_1.LanguageCodes.Arabic]: 'الدور غير موجود',
    },
    USER_NOT_VERIFIED: {
        [languages_1.LanguageCodes.English]: 'User Not Verified',
        [languages_1.LanguageCodes.Arabic]: 'المستخدم غير موثق',
    },
    INVALID_CREDINTIALS: {
        [languages_1.LanguageCodes.English]: 'Invalid Credintials',
        [languages_1.LanguageCodes.Arabic]: 'بيانات الاعتماد غير صالحة',
    },
    INVALID_FILE_FORMAT: {
        [languages_1.LanguageCodes.English]: 'Invalid File Format',
        [languages_1.LanguageCodes.Arabic]: 'تنسيق الملف غير صالح',
    },
    FILE_NOT_FOUND_ON_BUCKET: {
        [languages_1.LanguageCodes.English]: 'File Not Found On Bucket',
        [languages_1.LanguageCodes.Arabic]: 'الملف غير موجود على السلة',
    },
    ROUTE_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Route Not Found',
        [languages_1.LanguageCodes.Arabic]: 'المسار غير موجود',
    },
    VERIFY_YOUR_ACCOUNT: {
        [languages_1.LanguageCodes.English]: 'Verify Your Account',
        [languages_1.LanguageCodes.Arabic]: 'قم بتأكيد حسابك',
    },
    NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Not Found',
        [languages_1.LanguageCodes.Arabic]: 'غير موجود',
    },
    BAD_REQUEST: {
        [languages_1.LanguageCodes.English]: 'Bad Request',
        [languages_1.LanguageCodes.Arabic]: 'طلب خاطئ',
    },
    DATABASE_CONNECTION: {
        [languages_1.LanguageCodes.English]: 'Database Connection Error',
        [languages_1.LanguageCodes.Arabic]: 'خطأ في الاتصال بقاعدة البيانات',
    },
    NOT_ALLOWED: {
        [languages_1.LanguageCodes.English]: 'Not Allowed',
        [languages_1.LanguageCodes.Arabic]: 'غير مسموح',
    },
    UNAUTHORIZED: {
        [languages_1.LanguageCodes.English]: 'Unauthorized',
        [languages_1.LanguageCodes.Arabic]: 'غير مصرح',
    },
    VALIDATION_ERROR: {
        [languages_1.LanguageCodes.English]: 'Validation Error',
        [languages_1.LanguageCodes.Arabic]: 'خطأ في التحقق',
    },
    PRODUCT_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Product Not Found',
        [languages_1.LanguageCodes.Arabic]: 'المنتج غير موجود'
    },
    RATING_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Rating Not Found',
        [languages_1.LanguageCodes.Arabic]: 'التقييم غير موجود'
    },
    RATING_ALREADY_EXISTS: {
        [languages_1.LanguageCodes.English]: 'Rating Already Exists',
        [languages_1.LanguageCodes.Arabic]: 'التقييم موجود بالفعل'
    },
    POINT_NOT_FOUND: {
        [languages_1.LanguageCodes.English]: 'Point Not Found',
        [languages_1.LanguageCodes.Arabic]: 'النقاط غير موجودة'
    }
};
