import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
export declare const createRoleHandler: RequestHandler<unknown, SuccessResponse, {
    key: string;
    title: string;
    description?: string;
    permissions: string[];
}>;
export declare const getOneRoleHandler: RequestHandler<{
    roleId: string;
}, SuccessResponse, unknown>;
export declare const getRolesHandler: RequestHandler<unknown, SuccessResponse, unknown>;
export declare const updateRoleHandler: RequestHandler<{
    roleId: string;
}, SuccessResponse, {
    title?: string;
    description?: string;
    permissions?: string[];
}>;
export declare const removeRoleHandler: RequestHandler<{
    roleId: string;
}, SuccessResponse, unknown>;
