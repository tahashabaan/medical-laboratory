import { LanguageCodes } from '../constants/languages';
import { IjwtPayload } from './jwt-payload';
import { Ipagination } from './Pagination';
declare global {
    namespace Express {
        interface Request {
            loggedUser: IjwtPayload;
            pagination: Ipagination;
            lang: LanguageCodes;
        }
    }
}
