// lab.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MODEL_NAMES } from '../constants/model-names';

@Entity({ name: MODEL_NAMES.subscription })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscription_id!: string;

  @Column({ type: 'varchar', nullable: false })
  subscription_name!: string;

  @Column({ type: 'varchar', nullable: true })
  subscription_price?: string;

  @Column({ type: 'timestamptz', nullable: true })
  subscription_duration?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}

@Entity({ name: MODEL_NAMES.lap })
export class LapEntity {
  @PrimaryGeneratedColumn('uuid')
  lap_id!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;

  @ManyToOne(
    () => SubscriptionEntity,
    { nullable: false, eager: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'subscription_id' })
  subscription?: SubscriptionEntity;
}

