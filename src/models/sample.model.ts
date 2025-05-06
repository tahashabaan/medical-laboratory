import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { MODEL_NAMES } from '../constants/model-names';
import { LapEntity } from './lab.model';

// New PatientEntity
@Entity({ name: MODEL_NAMES.patient })
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  patient_id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: false })
  phone?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}

@Entity({ name: MODEL_NAMES.sample_notification })
export class SampleNotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  sample_notification_id!: string;

  @Column({ type: 'varchar', nullable: false })
  notification_name!: string;

  @Column({ type: 'text', nullable: true })
  notification_description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}


@Entity({ name: MODEL_NAMES.sample })
export class SampleEntity {
  @PrimaryGeneratedColumn('uuid')
  sample_id!: string;

  @ManyToOne(() => PatientEntity, { nullable: false, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient!: PatientEntity;

  @Column({ type: Number, nullable: false, default: 0 })
  result!: number;

  @Column({ type: 'varchar', nullable: false, default: 'pending' })
  status?: 'pending' | 'in progress' | 'completed' | 'failed' | 'cancelled';

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;

  @ManyToOne(() => LapEntity, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  @JoinColumn({ name: 'lap_id' })
  lap!: LapEntity;

  @OneToOne(() => SampleNotificationEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'notification_id' })
  notification?: SampleNotificationEntity;
}

@Entity({ name: MODEL_NAMES.sample_media })
export class SampleMediaEntity {
  @PrimaryGeneratedColumn('uuid')
  sample_media_id!: string;

  @ManyToOne(
    () => SampleEntity,
    { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true }
  )
  @JoinColumn({ name: 'sample_id' })
  sample!: SampleEntity;

  @Column({ type: 'varchar', nullable: false })
  media_type!: 'image' | 'video';

  @Column({ type: 'varchar', nullable: false })
  media_url!: string;

  @Column({ type: 'varchar', nullable: true })
  media_name?: string;

  @Column({ type: 'text', nullable: true })
  media_description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}

@Entity({ name: MODEL_NAMES.sample_result })
export class SampleResultEntity {
  @PrimaryGeneratedColumn('uuid')
  result_sample_id!: string;

  @ManyToOne(
    () => SampleEntity,
    { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true }
  )
  @JoinColumn({ name: 'sample_id' })
  sample!: SampleEntity;

  @Column({ type: Number, nullable: false })
 result_value!: number;

  @Column({ type: 'varchar', nullable: true })
  result_name?: string;


  @Column({ type: 'text', nullable: true })
  result_description?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt?: Date;
}


