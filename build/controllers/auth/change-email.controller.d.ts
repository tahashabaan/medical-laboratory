import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
export declare const askChangeEmailHandler: RequestHandler<unknown, SuccessResponse, {
    email: string;
    password: string;
}>;
