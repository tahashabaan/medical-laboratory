import { dataSource } from '../config/typeorm';
import { UserEntity, ProfileEntity } from './user.model';
import { PermissionEntity, RoleEntity, RolePermissionEntity } from './role.model';
import {LapEntity} from './lab.model';
import { SubscriptionEntity } from './subscription.model';
import { SampleEntity, SampleMediaEntity } from './sample.model';
import { SampleNotificationEntity } from './notification.model';

//  create table with lap name and subscription name
const Lap = dataSource.getRepository(LapEntity);
const Subscription = dataSource.getRepository(SubscriptionEntity);


// create table with sample and sampleMedia
const Sample = dataSource.getRepository(SampleEntity);
const SampleMedia = dataSource.getRepository(SampleMediaEntity);
const SampleNotification = dataSource.getRepository(SampleNotificationEntity);

const User = dataSource.getRepository(UserEntity);
const Profile = dataSource.getRepository(ProfileEntity);
const Role = dataSource.getRepository(RoleEntity);
const Permission = dataSource.getRepository(PermissionEntity);
const RolePermission = dataSource.getRepository(RolePermissionEntity);


export const Models = {
  Lap,
  Subscription,
  Sample,
  SampleMedia,
  SampleNotification,
  User,
  Role,
  Profile,
  Permission,
  RolePermission
};
