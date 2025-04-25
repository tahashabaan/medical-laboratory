import { BadRequest } from './bad-request-error';
import { Custom } from './custom-error';
import { DatabaseConnection } from './data-base-connections';
import { NotAllowed } from './not-allowed-error';
import { NotFound } from './notfound-error';
import { Unauthenticated } from './unauthenticated-error';
import { Unauthorized } from './unauthorized-error';
import { Validation } from './validation-error';
export declare const Errors: {
    BadRequest: typeof BadRequest;
    Custom: typeof Custom;
    DatabaseConnection: typeof DatabaseConnection;
    NotAllowed: typeof NotAllowed;
    NotFound: typeof NotFound;
    Unauthenticated: typeof Unauthenticated;
    Unauthorized: typeof Unauthorized;
    Validation: typeof Validation;
};
