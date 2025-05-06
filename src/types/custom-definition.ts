/* eslint-disable @typescript-eslint/no-namespace */

import { LanguageCodes } from '../constants/languages';
import { IjwtPayload } from './jwt-payload';
import { Ipagination } from './Pagination';
import 'express';

declare global {
  namespace Express {
    interface Request {
      loggedUser: IjwtPayload;
      pagination: Ipagination;
      lang: LanguageCodes;
      files?: Express.Multer.File[];
      file?: Express.Multer.File;
    }
  }
}
