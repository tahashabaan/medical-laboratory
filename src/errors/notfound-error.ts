import { Custom } from './custom-error';
import { ErrCodes } from '../constants/error-code';
import { ErrorResponse } from '../types/responses';
import { LanguageCodes } from '../constants/languages';

export class NotFound extends Custom {
  statusCode: number = 404;
  message: string;
  constructor(
    translates: Record<string, string> = ErrCodes.NOT_FOUND,
    lang: LanguageCodes = LanguageCodes.English,
  ) {
    super(translates, lang);
    this.message = translates[lang] || translates[LanguageCodes.English];
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  serializeError(): ErrorResponse {
    return { success: false, message: this.message, data: {} };
  }
}
