import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  Entity,
}  from 'typeorm';


import { SampleEntity } from './sample.model'; // Import the SampleEntity
// names of models in the system 
import { MODEL_NAMES } from '../constants/model-names';
import { VerifyReason } from '../constants/verify-reason';
import { create } from 'domain';


@Entity({ name: MODEL_NAMES.lap })
export class LapEntity {
    @PrimaryGeneratedColumn('uuid')
    lab_id!: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email!: string;

    @Column({ type: 'varchar', nullable: false, select: false })
    password!: string;


    @Column({ type: 'varchar', nullable: true })
    phone?: string;


    @Column({ type: 'varchar', nullable: true })
    address?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt?: Date;

    @CreateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
    updatedAt?: Date;

    @OneToMany(() => SampleEntity, sample => sample.lap, { cascade: true })
    samples?: SampleEntity[];  // Changed type from string[] to SampleEntity[]


    @ManyToOne(() => SubscriptionEntity, subscription => subscription.laps, { cascade: true, nullable: true })
    @JoinColumn({ name: 'subscription_id' })
    
    subscription?: SubscriptionEntity;
}


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
    
    @CreateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
    updatedAt?: Date;

    @Column({ type: 'varchar', nullable: true })
    
    @OneToMany(() => LapEntity, lap => lap.lab_id, { cascade: true })
    laps?: string[];

    // @JoinColumn({ name: 'lab_id' })
    // lapsRelation?: LapEntity[];

    // @Column({ type: 'varchar', nullable: true })
    // additionalField?: string;
}

 