import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
export declare const askForgetPasswordHandler: RequestHandler<unknown, SuccessResponse, {
    email: string;
}>;
export declare const updateForgetenPasswordHandler: RequestHandler<unknown, SuccessResponse, {
    email: string;
    newPassword: string;
}>;
