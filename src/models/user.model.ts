import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany
}  from 'typeorm';

import { MODEL_NAMES } from '../constants/model-names';
// import { OneToMany } from 'typeorm';
// import { PointHistoryEntity } from './point.model';
import { RoleEntity } from './role.model';
// import { CountryEntity } from './country.model';
import { VerifyReason } from '../constants/verify-reason';

// create table with name profile
@Entity({ name: MODEL_NAMES.profile })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'profile_image', type: 'varchar', nullable: true })
  profileImage?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'text', nullable: true })
  state?: string;

  @Column({ name: 'postal_code', type: 'integer', nullable: true })
  postalCode?: number;

  @Column({ name: 'line_one', type: 'varchar', nullable: true })
  lineOne?: string;

  @Column({ name: 'line_two', type: 'varchar', nullable: true })
  lineTwo?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}

@Entity({ name: MODEL_NAMES.auth })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  uid?: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  verificationCode?: string;

  @Column({ type: 'varchar', name: 'def_language', default: 'en' })
  defLanguage!: string;

  @Column({ type: 'timestamptz', name: 'verification_expire_at', nullable: true })
  verificationExpireAt?: Date;

  @Column({ type: 'enum', name: 'verification_reason', enum: VerifyReason, nullable: true })
  verificationReason?: VerifyReason;

  @Column({ type: 'varchar', name: 'verification_temp_email', nullable: true })
  verificationTempEmail?: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified!: boolean;

  @Column({ type: 'varchar', nullable: true })
  token?: string;

  @Column({ type: 'varchar', nullable: true })
  fcmToken?: string;

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity;

  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id' })
  profile?: ProfileEntity;

  // @OneToMany(() => PointHistoryEntity, (pointHistory) => pointHistory.user)
  // pointHistory!: PointHistoryEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.invitations, { nullable: true })
  @JoinColumn({ name: 'invited_by' })
  invitedBy?: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.invitedBy)
  invitations?: UserEntity[];

  // @ManyToOne(() => CountryEntity, (country) => country.code)
  // @JoinColumn({ name: 'country_code', referencedColumnName: 'code' })
  // country?: CountryEntity;
}
