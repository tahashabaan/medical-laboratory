import { LanguageCodes } from '../constants/languages';

export interface IjwtPayload {
  id?: string;
  email?: string;
  phone?: string;
  name?: string;  
  isGuest?: boolean;
  isVerified?: boolean;
  profileId?: string;
  roleId?: string;
  permissions?: string[];
  language?: LanguageCodes;
  isLab?: boolean;
}
