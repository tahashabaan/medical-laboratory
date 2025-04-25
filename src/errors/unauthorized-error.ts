import { Custom } from './custom-error';
import { ErrCodes } from '../constants/error-code';
import { ErrorResponse } from '../types/responses';
import { LanguageCodes } from '../constants/languages';

export class Unauthorized extends Custom {
  statusCode: number = 403;
  message: string;
  constructor(
    translates: Record<string, string> = ErrCodes.UNAUTHENTICATED,
    lang: LanguageCodes = LanguageCodes.English,
  ) {
    super(translates, lang);
    this.message = translates[lang] || translates[LanguageCodes.English];
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
  serializeError(): ErrorResponse {
    return { success: false, message: this.message, data: {} };
  }
}
