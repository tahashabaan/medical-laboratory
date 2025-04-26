import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,

} from 'typeorm';

import { MODEL_NAMES } from '../constants/model-names';
import e from 'cors';
import { LapEntity } from './lab.model';

@Entity({ name: MODEL_NAMES.sample })
export class SampleEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_id!: string;


    @Column({ type: 'varchar', nullable: false })
    user_name!: string;

    @Column({ type: 'varchar', nullable: false })
    result!: string;

    @Column({ type: 'varchar', nullable: true, unique: true })
    user_email?: string;

    @Column({ type: 'varchar', nullable: true, unique: true })
    user_phone?: string;

    @Column({ type: 'varchar', nullable: false, default: 'pending' })
    status?: 'pending' | 'in progress' | 'completed' | 'failed' | 'cancelled';

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
    updatedAt?: Date;

    @Column({ type: 'varchar', nullable: false, unique: true })
    @ManyToOne(() => LapEntity, lap => lap.samples, { cascade: true, nullable: true })
    @JoinColumn({ name: 'lap_id' })
    lap!: LapEntity;


// sample =>one to many relation with sample media
    // relation with sample 
    
}

// upload media for sample
@Entity({name: MODEL_NAMES.sample_media})
export class SampleMediaEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_media_id!: string;

    @Column({ type: 'varchar', nullable: false })
    // sample_id!: string;
    @ManyToOne(() => SampleEntity, sample => sample.sample_id, { cascade: true, nullable: false })
    @JoinColumn({ name: 'sample_id' })
    sample!: SampleEntity;
    
    @Column({ type: 'varchar', nullable: false })
    media_type!:  'image' | 'video';
    
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


// return sample result for sample
// @Entity({name: MODEL_NAMES.sample_result})
// export class SampleResultEntity {
//     @PrimaryGeneratedColumn('uuid')
//     sample_result_id!: string;


//     @Column({ type: 'varchar', nullable: false })
//     sample_id!: string;


//     @Column({ type: 'varchar', nullable: false })
//     result_name!: string;


//     @Column({ type: 'text', nullable: true })
//     result_description?: string;


//     @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
//     createdAt?: Date;


//     @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
//     updatedAt?: Date;
// }


// send notification to user for sample result
@Entity({name: MODEL_NAMES.sample_notification})
export class SampleNotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_notification_id!: string;

    @Column({ type: 'varchar', nullable: false })
    sample_id!: string;


    @Column({ type: 'varchar', nullable: false })
    notification_name!: string;


    @Column({ type: 'text', nullable: true })
    notification_description?: string;


    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt?: Date;


    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
    updatedAt?: Date;
}

