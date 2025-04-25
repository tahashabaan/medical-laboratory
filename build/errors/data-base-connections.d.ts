import { Custom } from './custom-error';
import { ErrorResponse } from '../types/responses';
import { LanguageCodes } from '../constants/languages';
export declare class DatabaseConnection extends Custom {
    statusCode: number;
    message: string;
    constructor(translates?: Record<string, string>, lang?: LanguageCodes);
    serializeError(): ErrorResponse;
}
