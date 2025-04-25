import { Tokens } from './../src/utils/token';
import { Bcrypt } from './../src/utils/bcrypt';
import { SystemRoles } from './../src/constants/system-roles';
import { Models } from './../src/models/index';
import { PERMISSIONS } from './../src/constants/permissions';
import { MODEL_NAMES } from './../src/constants/model-names';
import '../src/config/env';
import { dataSource, initializeDB } from '../src/config/typeorm';
import { env } from '../src/config/env';
import { LanguageCodes } from '../src/constants/languages';
import { v4 } from 'uuid';
import { PointCount, PointReason } from '../src/models/point.model';
import * as pointService from '../src/controllers/points/points.service';
import { DeepPartial } from 'typeorm';

const insertPoints = async ()=>{
  const points = [
    {
      count: PointCount.signup,
      reason: PointReason.signup,
      contents: [
        { languageCode: 'eng', name: 'Signup Bonus' },
        { languageCode: 'ara', name: 'مكافأة التسجيل' }
      ]
    },
    {
      count: PointCount.newsLetterSubscription,
      reason: PointReason.newsLetterSubscription,
      contents: [
        { languageCode: 'eng', name: 'Newsletter Subscription Reward' },
        { languageCode: 'ara', name: 'مكافأة الاشتراك في النشرة الإخبارية' }
      ]
    },
    {
      count: PointCount.eachDollarSpent,
      reason: PointReason.eachDollarSpent,
      contents: [
        { languageCode: 'eng', name: 'Points Per Dollar Spent' },
        { languageCode: 'ara', name: 'نقاط مقابل كل دولار يُنفق' }
      ]
    },
    {
      count: PointCount.rateWithVideo,
      reason: PointReason.rateWithVideo,
      contents: [
        { languageCode: 'eng', name: 'Rate with Video Reward' },
        { languageCode: 'ara', name: 'مكافأة التقييم بالفيديو' }
      ]
    },
    {
      count: PointCount.rateWithSelfie,
      reason: PointReason.rateWithSelfie,
      contents: [
        { languageCode: LanguageCodes.English, name: 'Rate with Selfie Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة التقييم بالسيلفي' }
      ]
    },
    {
      count: PointCount.rateProduct,
      reason: PointReason.rateProduct,
      contents: [
        { languageCode: LanguageCodes.English, name: 'Rate Product Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة تقييم المنتج' }
      ]
    },
    {
      count: PointCount.inviteFriend,
      reason: PointReason.inviteFriend,
      contents: [
        { languageCode: LanguageCodes.English, name: 'Invite a Friend Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة دعوة صديق' }
      ]
    },
    {
      count: PointCount.ratingKadinle,
      reason: PointReason.ratingKadinle,
      contents: [
        { languageCode: LanguageCodes.English, name: 'Kadinle Rating Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة تقييم Kadinle' }
      ]
    },
    {
      count: PointCount.sharingSurvey,
      reason: PointReason.sharingSurvey,
      contents: [
        { languageCode: LanguageCodes.English, name: 'Survey Sharing Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة مشاركة الاستبيان' }
      ]
    },
    {
      count: PointCount.dailySignin, 
      reason: PointReason.dailySignin,
      contents:[
        { languageCode: LanguageCodes.English, name: 'Daily Sign in Reward' },
        { languageCode: LanguageCodes.Arabic, name: 'مكافأة تسجيل الدخول اليومي' }
      ]
    }
  ];
  
  for(const point of points){
    const existingPoint = await Models.Point.findOne({ where: { reason: point.reason } });
    if (!existingPoint) {
     const savedPoint = await Models.Point.save({
       count: point.count,
       reason: point.reason,
     });

     await Models.PointContent.save(
       point.contents.map((content) => ({
         ...content,
         languageCode: content.languageCode as DeepPartial<LanguageCodes>,
         point: savedPoint,
       }))
     );
    }
  }
  console.log('Points seeded successfully');
}


(async () => {
  await initializeDB();
  // add permissions
  const allPermissions = Object.values(PERMISSIONS);
  for (const perm of allPermissions) {
    const existing = await Models.Permission.findOne({ where: { key: perm } });
    if (!existing) {
      await Models.Permission.save({ key: perm });
    }
  }
  // add system roles
  const allSystemRoles = Object.values(SystemRoles);
  for (const role of allSystemRoles) {
    const existing = await Models.Role.findOne({ where: { key: role } });
    if (!existing) {
      await Models.Role.save({ key: role, title: role, isCreatedBySystem: true });
    }
  }
  // add system roles permissions
  await Models.RolePermission.delete({});
  await Models.RolePermission.save(
    allSystemRoles
      .map((role) =>
        allPermissions.map((perm) => ({ role: { key: role }, permission: { key: perm } })),
      )
      .flat(),
  );
  // add superadmin user
  let user = await Models.User.findOne({ where: { email: 'admin@email.com' } });
  if (!user) {
    const adminRole = await Models.Role.findOne({ where: { key: SystemRoles.admin } });
    const userId = v4();
    user = await Models.User.save({
      id: userId,
      email: 'admin@email.com',
      password: await Bcrypt.hashPwd('admin', env.bcrypt.salt, env.bcrypt.paper),
      role: adminRole!,
      isVerified: true,
      defLanguage: LanguageCodes.English,
      token: Tokens.generateRefreshToken({ id: userId }),
    });
    const profile = await Models.Profile.save({
      name: 'admin',
      phone: '01552159359',
    });
    await Models.User.update(user.id, { profile });
  }
  // add countries
  const countries = ['EGYPT', 'TURKEY', 'SAUDI ARABIA', 'UNITED ARAB EMIRATES', 'KUWAIT', 'QATAR'];
  for (const country of countries) {
    const existing = await Models.Country.findOne({ where: { name: country } });
    if (!existing) {
      await Models.Country.save({ name: country, code: country, createdBy: user! });
    }
  }

  // add points 
  await insertPoints();
  await dataSource.destroy();
  console.log('Roles seeded successfully');
})();
