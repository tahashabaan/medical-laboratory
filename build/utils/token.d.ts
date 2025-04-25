import { IjwtPayload } from '../types/jwt-payload';
export declare const isValidToken: (token: string) => boolean;
export declare const Tokens: {
    generateAccessToken: (payload: IjwtPayload) => string;
    generateRefreshToken: (payload: {
        id: string;
    }) => string;
    verifyToken: (token: string) => string | import("jsonwebtoken").JwtPayload | undefined;
    isValidToken: (token: string) => boolean;
};
