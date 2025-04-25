import { ValidationError as vError } from 'express-validator';
import { Custom } from './custom-error';
import { ValidationErrorResponse } from '../types/responses';
export declare class Validation extends Custom {
    error: vError[];
    statusCode: number;
    message: string;
    constructor(error: vError[]);
    serializeError(): ValidationErrorResponse;
}
