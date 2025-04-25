import { v4 } from 'uuid';
import { Errors } from '../../errors';
import { Models } from '../../models';
import { env } from '../../config/env';
import { RequestHandler } from 'express';
import { Tokens } from '../../utils/token';
import { Crypto } from '../../utils/crypto';
import { Bcrypt } from '../../utils/bcrypt';
import { ErrCodes } from '../../constants/error-code';
import { SuccessResponse } from '../../types/responses';
import { SystemRoles } from '../../constants/system-roles';
import { VerifyReason } from '../../constants/verify-reason';
import { LanguageCodes } from '../../constants/languages';
// import { pointService } from '../points/points.service';
// import { PointReason } from '../../models/point.model';

export const signupHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    name: string;
    email: string;
    password: string;
    phone: string;
    defLanguage?: LanguageCodes;
    fcmToken?: string;
    country: { code: string };
    city?: string;
    state?: string;
    postalCode?: number;
  }
> = async (req, res, next) => {
  const userId = v4();
  const code = await Crypto.generateCode(3);
  const hashedPwd = await Bcrypt.hashPwd(req.body.password, env.bcrypt.salt, env.bcrypt.paper);

  const targetRole = await Models.Role.findOne({
    where: {
      key: SystemRoles.client,
      isCreatedBySystem: true,
    },
  });
  if (!targetRole) return next(new Errors.NotFound(ErrCodes.ROLE_NOT_FOUND, req.lang));

  const user = await Models.User.save({
    id: userId,
    email: req.body.email,
    password: hashedPwd,
    role: targetRole,
    verificationCode: code,
    verificationExpireAt: new Date(Date.now() + env.auth.activationCodeExpireIn),
    verificationReason: VerifyReason.signup,
    defLanguage: req.body.defLanguage || LanguageCodes.English,
    fcmToken: req.body.fcmToken,
    country: req.body.country,
    token: Tokens.generateRefreshToken({ id: userId }),
  });

  const profile = await Models.Profile.save({
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    name: req.body.name,
    phone: req.body.phone,
  });

  await Models.User.update(user.id, { profile });

  const accessToken = Tokens.generateAccessToken({
    id: userId,
    isGuest: false,
    roleId: targetRole.id,
    isVerified: false,
    profileId: profile.id,
    permissions: [],
    language: req.body.defLanguage || LanguageCodes.English,
  });
  // pointService.addPointsToHistory(user.id, PointReason.signup, req.lang);
  // res.status(201).json({
  //   success: true,
  //   message: 'User created successfully & code sent by email',
  //   data: { accessToken, refreshToken: user.token },
  // });
};
