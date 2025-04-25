import { RoleEntity } from './role.model';
import { VerifyReason } from '../constants/verify-reason';
export declare class ProfileEntity {
    id: string;
    profileImage?: string;
    city?: string;
    state?: string;
    postalCode?: number;
    lineOne?: string;
    lineTwo?: string;
    phone?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class UserEntity {
    id: string;
    uid?: string;
    email: string;
    password: string;
    verificationCode?: string;
    defLanguage: string;
    verificationExpireAt?: Date;
    verificationReason?: VerifyReason;
    verificationTempEmail?: string;
    isVerified: boolean;
    token?: string;
    fcmToken?: string;
    role: RoleEntity;
    profile?: ProfileEntity;
    createdAt?: Date;
    invitedBy?: UserEntity;
    invitations?: UserEntity[];
}
