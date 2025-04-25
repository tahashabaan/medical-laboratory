import { Custom } from './custom-error';
import { ErrCodes } from '../constants/error-code';
import { ErrorResponse } from '../types/responses';
import { LanguageCodes } from '../constants/languages';

export class DatabaseConnection extends Custom {
  statusCode = 500;
  message: string;
  constructor(
    translates: Record<string, string> = ErrCodes.BAD_REQUEST,
    lang: LanguageCodes = LanguageCodes.English,
  ) {
    super(translates, lang);
    this.message = translates[lang] || translates[LanguageCodes.English];
    Object.setPrototypeOf(this, DatabaseConnection.prototype);
  }

  serializeError(): ErrorResponse {
    return { success: false, message: this.message, data: {} };
  }
}
