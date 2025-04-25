import { Custom } from './custom-error';
import { ErrCodes } from '../constants/error-code';
import { ErrorResponse } from '../types/responses';
import { LanguageCodes } from '../constants/languages';

export class NotAllowed extends Custom {
  statusCode: number = 406;
  message: string;
  constructor(
    translates: Record<string, string> = ErrCodes.NOT_ALLOWED,
    lang: LanguageCodes = LanguageCodes.English,
  ) {
    super(translates, lang);
    this.message = translates[lang] || translates[LanguageCodes.English];
    Object.setPrototypeOf(this, NotAllowed.prototype);
  }
  serializeError(): ErrorResponse {
    return { success: false, message: this.message, data: {} };
  }
}
