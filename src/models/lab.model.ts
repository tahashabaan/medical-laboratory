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
import { SampleEntity } from './sample.model';

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
    () => SubscriptionEntity,
    subscription => subscription.laps,
    { nullable: true, eager: true }
  )
  @JoinColumn({ name: 'subscription_id' }) // explicitly define the FK column
  subscription?: SubscriptionEntity;

  @OneToMany(
    () => SampleEntity,
    sample => sample.lap,
    { cascade: true }
  )
  samples?: SampleEntity[];
}


// subscription.entity.ts';
@Entity({ name: MODEL_NAMES.subscription })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscription_id!: string;

  @Column({ type: 'varchar', nullable: false })
  subscription_name!: string;

  @Column({ type: 'varchar', nullable: true })
  subscription_price?: string;

  @Column({ type: 'varchar', nullable: true })
  subscription_duration?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;                       // updated decorator here too

  @OneToMany(
    () => LapEntity,
    lap => lap.subscription,
    { cascade: true }
  )
  laps?: LapEntity[];
}
