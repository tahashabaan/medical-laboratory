import { profile } from 'console';

export const selectUserFields = {
  id: true,
  email: true,
  profile: {
    name: true,
    profileImage: true,
  },
};

export const selectQueryBuilderUserFields = (alias: string) => [
  `${alias}.id`,
  `${alias}.email`,
  `${alias}_profile.name`,
  `${alias}_profile.profileImage`,
];
