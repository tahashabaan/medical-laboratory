import { Custom } from './custom-error';
import { ErrorResponse } from '../types/responses';
import { ErrCodes } from '../constants/error-code';
import { LanguageCodes } from '../constants/languages';

export class BadRequest extends Custom {
  statusCode: number = 400;
  message: string;
  constructor(
    translates: Record<string, string> = ErrCodes.BAD_REQUEST,
    lang: LanguageCodes = LanguageCodes.English,
  ) {
    super(translates, lang);
    this.message = translates[lang] || translates[LanguageCodes.English];
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
  serializeError(): ErrorResponse {
    return { success: false, message: this.message, data: {} };
  }
}
