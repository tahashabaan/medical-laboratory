import { LanguageCodes } from './languages';

export enum ERR_CODES {
  notFound = 'NOT_FOUND',
  badRequest = 'BAD_REQUEST',
  databaseConnection = 'DATABASE_CONNECTION',
  notAllowed = 'NOT_ALLOWED',
  unauthorized = 'UNAUTHORIZED',
  validationError = 'VALIDATION_ERROR',
  verifyYourAccount = 'VERIFY_YOUR_ACCOUNT',
  routeNotFound = 'ROUTE_NOT_FOUND',
  fileNotFoundOnBucket = 'FILE_NOT_FOUND_ON_BUCKET',
  invalidFileFormat = 'INVALID_FILE_FORMAT',
  INVALID_CREDINTIALS = 'INVALID_CREDINTIALS',
  USER_NOT_VERIFIED = 'USER_NOT_VERIFIED',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
  NO_REASON_TO_VERIFY = 'NO_REASON_TO_VERIFY',
  EXPIRED_CODE = 'EXPIRED_CODE',
  INVALID_DATA = 'INVALID_DATA',
  NO_REASON_TO_RESEND_CODE = 'NO_REASON_TO_RESEND_CODE',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  VERIFICATION_CODE_NOT_VERIFIED = 'VERIFICATION_CODE_NOT_VERIFIED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ACTION_ALREADY_DONE = 'ACTION_ALREADY_DONE',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  CANT_REMOVE_ALL_PRODUCT_RESOURCES = 'CANT_REMOVE_ALL_PRODUCT_RESOURCES',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  RATING_NOT_FOUND = 'RATING_NOT_FOUND',
  RATING_ALREADY_EXISTS = 'RATING_ALREADY_EXISTS',
  POINT_NOT_FOUND = 'POINT_NOT_FOUND',
  SUBSCRIPTION_REQUIRED = 'SUBSCRIPTION_REQUIRED',
}

export const ErrCodes: { [key in ERR_CODES]: Record<string, string> } = {
  CANT_REMOVE_ALL_PRODUCT_RESOURCES: {
    [LanguageCodes.English]: "Can't remove all product resources",
    [LanguageCodes.Arabic]: 'لا يمكن إزالة جميع محتويات المنتج',
  },
  UNAUTHENTICATED: {
    [LanguageCodes.English]: 'Unauthenticated',
    [LanguageCodes.Arabic]: 'غير مصادق عليه',
  },
  ACTION_ALREADY_DONE: {
    [LanguageCodes.English]: 'Action Already Done',
    [LanguageCodes.Arabic]: 'الإجراء تم بالفعل',
  },
  INVALID_TOKEN: {
    [LanguageCodes.English]: 'Invalid Token',
    [LanguageCodes.Arabic]: 'الرمز غير صالح',
  },
  VERIFICATION_CODE_NOT_VERIFIED: {
    [LanguageCodes.English]: 'Verification Code Not Verified',
    [LanguageCodes.Arabic]: 'رمز التحقق غير موثق',
  },
  EMAIL_NOT_FOUND: {
    [LanguageCodes.English]: 'Email Not Found',
    [LanguageCodes.Arabic]: 'البريد الإلكتروني غير موجود',
  },
  EMAIL_ALREADY_EXISTS: {
    [LanguageCodes.English]: 'Email Already Exists',
    [LanguageCodes.Arabic]: 'البريد الإلكتروني موجود بالفعل',
  },
  NO_REASON_TO_RESEND_CODE: {
    [LanguageCodes.English]: 'No Reason To Resend Code',
    [LanguageCodes.Arabic]: 'لا يوجد سبب لإعادة إرسال الرمز',
  },
  INVALID_DATA: {
    [LanguageCodes.English]: 'Invalid Data',
    [LanguageCodes.Arabic]: 'بيانات غير صالحة',
  },
  EXPIRED_CODE: {
    [LanguageCodes.English]: 'Expired Code',
    [LanguageCodes.Arabic]: 'الرمز منتهي الصلاحية',
  },
  NO_REASON_TO_VERIFY: {
    [LanguageCodes.English]: 'No Reason To Verify',
    [LanguageCodes.Arabic]: 'لا يوجد سبب للتحقق',
  },
  INVALID_VERIFICATION_CODE: {
    [LanguageCodes.English]: 'Invalid Verification Code',
    [LanguageCodes.Arabic]: 'رمز التحقق غير صالح',
  },
  ROLE_NOT_FOUND: {
    [LanguageCodes.English]: 'Role Not Found',
    [LanguageCodes.Arabic]: 'الدور غير موجود',
  },
  USER_NOT_VERIFIED: {
    [LanguageCodes.English]: 'User Not Verified',
    [LanguageCodes.Arabic]: 'المستخدم غير موثق',
  },
  INVALID_CREDINTIALS: {
    [LanguageCodes.English]: 'Invalid Credintials',
    [LanguageCodes.Arabic]: 'بيانات الاعتماد غير صالحة',
  },
  INVALID_FILE_FORMAT: {
    [LanguageCodes.English]: 'Invalid File Format',
    [LanguageCodes.Arabic]: 'تنسيق الملف غير صالح',
  },
  FILE_NOT_FOUND_ON_BUCKET: {
    [LanguageCodes.English]: 'File Not Found On Bucket',
    [LanguageCodes.Arabic]: 'الملف غير موجود على السلة',
  },
  ROUTE_NOT_FOUND: {
    [LanguageCodes.English]: 'Route Not Found',
    [LanguageCodes.Arabic]: 'المسار غير موجود',
  },
  VERIFY_YOUR_ACCOUNT: {
    [LanguageCodes.English]: 'Verify Your Account',
    [LanguageCodes.Arabic]: 'قم بتأكيد حسابك',
  },
  NOT_FOUND: {
    [LanguageCodes.English]: 'Not Found',
    [LanguageCodes.Arabic]: 'غير موجود',
  },
  BAD_REQUEST: {
    [LanguageCodes.English]: 'Bad Request',
    [LanguageCodes.Arabic]: 'طلب خاطئ',
  },
  DATABASE_CONNECTION: {
    [LanguageCodes.English]: 'Database Connection Error',
    [LanguageCodes.Arabic]: 'خطأ في الاتصال بقاعدة البيانات',
  },
  NOT_ALLOWED: {
    [LanguageCodes.English]: 'Not Allowed',
    [LanguageCodes.Arabic]: 'غير مسموح',
  },
  UNAUTHORIZED: {
    [LanguageCodes.English]: 'Unauthorized',
    [LanguageCodes.Arabic]: 'غير مصرح',
  },
  VALIDATION_ERROR: {
    [LanguageCodes.English]: 'Validation Error',
    [LanguageCodes.Arabic]: 'خطأ في التحقق',
  },
  PRODUCT_NOT_FOUND: {
    [LanguageCodes.English]: 'Product Not Found',
    [LanguageCodes.Arabic]: 'المنتج غير موجود',
  },
  RATING_NOT_FOUND: {
    [LanguageCodes.English]: 'Rating Not Found',
    [LanguageCodes.Arabic]: 'التقييم غير موجود',
  },
  RATING_ALREADY_EXISTS: {
    [LanguageCodes.English]: 'Rating Already Exists',
    [LanguageCodes.Arabic]: 'التقييم موجود بالفعل',
  },
  POINT_NOT_FOUND: {
    [LanguageCodes.English]: 'Point Not Found',
    [LanguageCodes.Arabic]: 'النقاط غير موجودة',
  },
  SUBSCRIPTION_REQUIRED: {
    [LanguageCodes.English]: 'Subscription plan is required. Please select or create a subscription.',
    [LanguageCodes.Arabic]: 'يجب اختيار أو إنشاء خطة اشتراك.',
  },
};
