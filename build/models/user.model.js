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
exports.UserEntity = exports.ProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const model_names_1 = require("../constants/model-names");
const typeorm_2 = require("typeorm");
// import { PointHistoryEntity } from './point.model';
const role_model_1 = require("./role.model");
// import { CountryEntity } from './country.model';
const verify_reason_1 = require("../constants/verify-reason");
let ProfileEntity = class ProfileEntity {
};
exports.ProfileEntity = ProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_image', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_one', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "lineOne", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_two', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "lineTwo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], ProfileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], ProfileEntity.prototype, "updatedAt", void 0);
exports.ProfileEntity = ProfileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: model_names_1.MODEL_NAMES.profile })
], ProfileEntity);
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "verificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'def_language', default: 'en' }),
    __metadata("design:type", String)
], UserEntity.prototype, "defLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'verification_expire_at', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "verificationExpireAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', name: 'verification_reason', enum: verify_reason_1.VerifyReason, nullable: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "verificationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'verification_temp_email', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "verificationTempEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_verified', default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "fcmToken", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_model_1.RoleEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_model_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ProfileEntity),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id' }),
    __metadata("design:type", ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, (user) => user.invitations, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'invited_by' }),
    __metadata("design:type", UserEntity)
], UserEntity.prototype, "invitedBy", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => UserEntity, (user) => user.invitedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "invitations", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: model_names_1.MODEL_NAMES.auth })
], UserEntity);
