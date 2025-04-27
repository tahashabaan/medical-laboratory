import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Errors } from '../../errors';
import { IjwtPayload } from '../../types/jwt-payload';
import { Models } from '../../models';
import { ErrCodes } from '../../constants/error-code';
import { Bcrypt } from '../../utils/bcrypt';
import { env } from '../../config/env';
import { Tokens } from '../../utils/token';
import { LanguageCodes } from '../../constants/languages';
// import { pointService } from '../points/points.service';
// import { PointReason } from '../../models/point.model';

export const signinHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    email: string;
    password: string;
  }
> = async (req, res, next) => {
  const userRepo = Models.User;

  const user = await userRepo.findOne({ where: { email: req.body.email }, loadRelationIds: true });
  
  if (!user) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));

  const isPwdMatch = await Bcrypt.comparePwd(req.body.password, user.password, env.bcrypt.paper);
  if (!isPwdMatch) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));
  if (!user.isVerified) return next(new Errors.BadRequest(ErrCodes.USER_NOT_VERIFIED, req.lang));

  if (!user.token || !Tokens.isValidToken(user.token)) {
    const token = Tokens.generateRefreshToken({ id: user.id });
    user.token = token;
    await userRepo.save(user);
  }

  const accessToken = Tokens.generateAccessToken({
    id: user.id,
    isGuest: false,
    isVerified: user.isVerified,
    profileId: user.profile as unknown as string,
    roleId: user.role as unknown as string,
    language: user.defLanguage || LanguageCodes.English,
  } as IjwtPayload);

  // pointService.addPointsToHistory(user.id, PointReason.dailySignin, req.lang);
  // res.status(200).json({
  //   success: true,
  //   message: 'signin successfully',
  //   data: { access_token: accessToken, refresh_token: user.token },
  // });
};
