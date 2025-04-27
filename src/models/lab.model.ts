// lap.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { MODEL_NAMES } from '../constants/model-names';
import {SampleEntity as  Sample } from './sample.model';
import {SubscriptionEntity as  Subscription } from './subscription.model';

@Entity({ name: MODEL_NAMES.lap })
export class LapEntity {
  @PrimaryGeneratedColumn('uuid')
  lap_id!: string;                        // renamed for consistency

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
  updatedAt?: Date;                       // ✅ fixed

  @ManyToOne(
    () => Subscription,
    subscription => subscription.laps,
    { nullable: true, eager: true }
  )
  @JoinColumn({ name: 'subscription_id' }) // explicitly define the FK column
  subscription?: Subscription;

  @OneToMany(
    () => Sample,
    sample => sample.lap,
    { cascade: true }
  )
  samples?: Sample[];
}

