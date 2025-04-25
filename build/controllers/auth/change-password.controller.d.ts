import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
export declare const changePasswordHandler: RequestHandler<unknown, SuccessResponse, {
    oldPassword: string;
    newPassword: string;
}>;
