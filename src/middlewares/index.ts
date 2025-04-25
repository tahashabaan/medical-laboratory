import { LanguageCodes } from '../constants/languages';
// import { authentication } from './authentication.middlewares';
import { errorHandler } from './error-handling.middlewares';
import { routeNotFound } from './route-not-found.middlewares';
import { validator } from './validator.middleware';

export const Middlewares = {
  // authentication,
  routeNotFound,
  errorHandler,
  validator,
  // LanguageCodes
};
