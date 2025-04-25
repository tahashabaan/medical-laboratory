import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
export declare const verifyHandler: RequestHandler<unknown, SuccessResponse, {
    email: string;
    code: string;
}>;
export declare const resendVerificationCode: RequestHandler<unknown, SuccessResponse, {
    email: string;
}>;
