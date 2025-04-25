"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionEntity = exports.PermissionEntity = exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const model_names_1 = require("../constants/model-names");
let RoleEntity = class RoleEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], RoleEntity.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_created_by_system', default: false }),
    __metadata("design:type", Boolean)
], RoleEntity.prototype, "isCreatedBySystem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RolePermissionEntity, (rolePermission) => rolePermission.role),
    __metadata("design:type", Array)
], RoleEntity.prototype, "permissions", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: model_names_1.MODEL_NAMES.role })
], RoleEntity);
let PermissionEntity = class PermissionEntity {
};
exports.PermissionEntity = PermissionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PermissionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PermissionEntity, (permission) => permission.children, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", PermissionEntity)
], PermissionEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PermissionEntity, (permission) => permission.parent),
    __metadata("design:type", Array)
], PermissionEntity.prototype, "children", void 0);
exports.PermissionEntity = PermissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: model_names_1.MODEL_NAMES.permission })
], PermissionEntity);
let RolePermissionEntity = class RolePermissionEntity {
};
exports.RolePermissionEntity = RolePermissionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RolePermissionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RoleEntity, (role) => role.key, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'role_key', referencedColumnName: 'key' }),
    __metadata("design:type", RoleEntity)
], RolePermissionEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PermissionEntity, (permission) => permission.key, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'permission_key', referencedColumnName: 'key' }),
    __metadata("design:type", PermissionEntity)
], RolePermissionEntity.prototype, "permission", void 0);
exports.RolePermissionEntity = RolePermissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: model_names_1.MODEL_NAMES.role_permission })
], RolePermissionEntity);
