export declare class RoleEntity {
    id: string;
    key: string;
    title: string;
    description?: string;
    isCreatedBySystem: boolean;
    permissions: RolePermissionEntity[];
}
export declare class PermissionEntity {
    id: string;
    key: string;
    description?: string;
    parent?: PermissionEntity;
    children: PermissionEntity[];
}
export declare class RolePermissionEntity {
    id: string;
    role: RoleEntity;
    permission: PermissionEntity;
}
