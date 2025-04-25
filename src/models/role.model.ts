import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MODEL_NAMES } from '../constants/model-names';

@Entity({ name: MODEL_NAMES.role })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  key!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', name: 'is_created_by_system', default: false })
  isCreatedBySystem!: boolean;

  @OneToMany(() => RolePermissionEntity, (rolePermission) => rolePermission.role)
  permissions!: RolePermissionEntity[];
}

@Entity({ name: MODEL_NAMES.permission })
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  key!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => PermissionEntity, (permission) => permission.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: PermissionEntity;

  @OneToMany(() => PermissionEntity, (permission) => permission.parent)
  children!: PermissionEntity[];
}

@Entity({ name: MODEL_NAMES.role_permission })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => RoleEntity, (role) => role.key, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_key', referencedColumnName: 'key' })
  role!: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.key, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_key', referencedColumnName: 'key' })
  permission!: PermissionEntity;
}
