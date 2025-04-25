import { UserEntity, ProfileEntity } from './user.model';
import { PermissionEntity, RoleEntity } from './role.model';
export declare const Models: {
    User: import("typeorm").Repository<UserEntity>;
    Role: import("typeorm").Repository<RoleEntity>;
    Profile: import("typeorm").Repository<ProfileEntity>;
    Permission: import("typeorm").Repository<PermissionEntity>;
};
