import { PERMISSIONS } from './permissions';

export enum SystemRoles {
  admin = 'admin',
  provider = 'provider',
  client = 'client',
  guest = 'guest',
}

const allPermissions = Object.values(PERMISSIONS);
export const SystemRolesPermissions: { [key in SystemRoles]: PERMISSIONS[] } = {
  [SystemRoles.admin]: allPermissions,
  [SystemRoles.provider]: allPermissions,
  [SystemRoles.client]: allPermissions,
  [SystemRoles.guest]: allPermissions,
};
