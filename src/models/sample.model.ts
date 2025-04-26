import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,

} from 'typeorm';

import { MODEL_NAMES } from '../constants/model-names';
import { LapEntity as Lap } from './lab.model';

@Entity({ name: MODEL_NAMES.sample })
export class SampleEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_id!: string;


    @Column({ type: 'varchar', nullable: false })
    user_name!: string;

    @Column({ type: 'varchar', nullable: false, default:0 })
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

  
    @OneToMany(
        () => SampleMediaEntity, 
         media => media.sample, 
        { eager: true, cascade: true }
    )
    sampleMedia!: SampleMediaEntity[];

    @ManyToOne(() => Lap, lap => lap.samples, { cascade: true, nullable: false, eager: true})
    @JoinColumn({ name: 'lap_id' })
    lap!: Lap;

    @OneToOne(
        () => SampleNotificationEntity,
        notification => notification.sample,
        { cascade: true, eager: true }
      )
     notification?: SampleNotificationEntity;


}

// upload media for sample
@Entity({name: MODEL_NAMES.sample_media})
export class SampleMediaEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_media_id!: string;

    @Column({ type: 'varchar', nullable: false })
    // sample_id!: string;
    @ManyToOne(
        () => SampleEntity, 
        sample => sample.sampleMedia,
         { cascade: true, nullable: false, eager: true }
    )
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

    @OneToOne(
        () => SampleEntity,
        sample => sample.notification,
        { nullable: false, eager: true, cascade: true }
      )
      @JoinColumn({ name: 'sample_id' })
      sample!: SampleEntity;
    


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
