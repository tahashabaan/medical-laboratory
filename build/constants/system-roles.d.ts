import { PERMISSIONS } from './permissions';
export declare enum SystemRoles {
    admin = "admin",
    provider = "provider",
    client = "client",
    guest = "guest"
}
export declare const SystemRolesPermissions: {
    [key in SystemRoles]: PERMISSIONS[];
};
