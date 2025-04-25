import { body, header } from 'express-validator';
import { validator } from '../middlewares/validator.middleware';
import { LanguageCodes } from '../constants/languages';

export const verify = [body('email').isEmail(), body('code').isString(), validator];
export const resendVerify = [body('email').isEmail(), validator];

export const resendVerification = [body('email').isEmail(), validator];

export const signup = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
  body('phone').isMobilePhone('any'),
  body('defLanguage').optional().isIn(Object.values(LanguageCodes)),
  body('fcmToken').optional().isString(),
  body('country')
    .isString()
    .bail()
    .customSanitizer((value) => ({ code: value })),
  body('city').optional().isString(),
  body('state').optional().isString(),
  body('postalCode').optional().isNumeric().bail().toInt(),
  validator,
];

export const signin = [body('email').isEmail(), body('password').isString(), validator];

export const refreshUserToken = [header('Authorization').isString(), validator];

export const askForgetPassword = [body('email').isEmail(), validator];

export const updateForgottenPassword = [
  body('email').isEmail(),
  body('newPassword').isString(),
  validator,
];

export const changeEmail = [body('email').isEmail(), body('password').isString(), validator];

export const changePassword = [
  body('oldPassword').isString(),
  body('newPassword').isString(),
  validator,
];
