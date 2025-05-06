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
import {SampleEntity as Sample } from './sample.model';

@Entity({name: MODEL_NAMES.sample_notification})
export class SampleNotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    sample_notification_id!: string;

    @Column({ type: 'varchar', nullable: false })
    notification_name!: string;

    @Column({ type: 'text', nullable: true })
    notification_description?: string;

    @OneToOne(
        () => Sample,
        sample => sample.notification,
        { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    @JoinColumn({ name: 'sample_id' })
    sample!: Sample;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
    updatedAt?: Date;
}
