import { dataSource } from '../config/typeorm';
import { UserEntity, ProfileEntity } from './user.model';
import { PermissionEntity, RoleEntity, RolePermissionEntity } from './role.model';
import {LapEntity, SubscriptionEntity} from './lab.model';
import { SampleEntity, SampleMediaEntity, SampleNotificationEntity } from './sample.model';

//  create table with lap name and subscription name
const Lap = dataSource.getRepository(LapEntity);
const Subscription = dataSource.getRepository(SubscriptionEntity);


// create table with sample and sampleMedia
const sample = dataSource.getRepository(SampleEntity);
const sampleMedia = dataSource.getRepository(SampleMediaEntity);
const sampleNotification = dataSource.getRepository(SampleNotificationEntity);

const User = dataSource.getRepository(UserEntity);
const Profile = dataSource.getRepository(ProfileEntity);
const Role = dataSource.getRepository(RoleEntity);
const Permission = dataSource.getRepository(PermissionEntity);
const RolePermission = dataSource.getRepository(RolePermissionEntity);


export const Models = {
  Lap,
  Subscription,
  sample,
  sampleMedia,
  sampleNotification,
  User,
  Role,
  Profile,
  Permission,
  RolePermission
};
