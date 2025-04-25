import { LanguageCodes } from '../constants/languages';
import { ErrorResponse, ValidationErrorResponse } from '../types/responses';
export declare abstract class Custom extends Error {
    abstract statusCode: number;
    abstract message: string;
    constructor(translates: Record<string, string>, lang?: LanguageCodes);
    abstract serializeError(): ErrorResponse | ValidationErrorResponse;
}
