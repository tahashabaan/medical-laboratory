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

  import { LapEntity as Lap } from './lab.model';
import { SampleEntity as Sample } from './sample.model';


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
    () => Lap,
    lap => lap.subscription,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  laps?: Lap[];
}
