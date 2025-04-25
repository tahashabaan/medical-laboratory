"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectQueryBuilderUserFields = exports.selectUserFields = void 0;
exports.selectUserFields = {
    id: true,
    email: true,
    profile: {
        name: true,
        profileImage: true,
    },
};
const selectQueryBuilderUserFields = (alias) => [
    `${alias}.id`,
    `${alias}.email`,
    `${alias}_profile.name`,
    `${alias}_profile.profileImage`,
];
exports.selectQueryBuilderUserFields = selectQueryBuilderUserFields;
