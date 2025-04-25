import { LanguageCodes } from '../constants/languages';
import { ErrorResponse, ValidationErrorResponse } from '../types/responses';

export abstract class Custom extends Error {
  abstract statusCode: number;
  abstract message: string;
  constructor(translates: Record<string, string>, lang: LanguageCodes = LanguageCodes.English) {
    super(lang);
    Object.setPrototypeOf(this, Custom.prototype);
  }

  abstract serializeError(): ErrorResponse | ValidationErrorResponse;
}
