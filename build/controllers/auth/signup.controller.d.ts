import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { LanguageCodes } from '../../constants/languages';
export declare const signupHandler: RequestHandler<unknown, SuccessResponse, {
    name: string;
    email: string;
    password: string;
    phone: string;
    defLanguage?: LanguageCodes;
    fcmToken?: string;
    country: {
        code: string;
    };
    city?: string;
    state?: string;
    postalCode?: number;
}>;
