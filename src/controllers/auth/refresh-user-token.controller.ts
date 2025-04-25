import { RequestHandler } from 'express';
import { Unauthenticated } from '../../errors/unauthenticated-error';
import { Tokens } from '../../utils/token';
import { Models } from '../../models';
import { SuccessResponse } from '../../types/responses';
import { IjwtPayload } from '../../types/jwt-payload';
import { ErrCodes } from '../../constants/error-code';

export const refreshUserToken: RequestHandler<unknown, SuccessResponse> = async (
  req,
  res,
  next,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new Unauthenticated());
  const decoded = Tokens.verifyToken(token) as { id: string };
  if (!decoded) return next(new Unauthenticated());
  const user = await Models.User.createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .where('user.id = :id', { id: decoded.id })
    .andWhere('user.token = :token', { token })
    .select(['user', 'role.key'])
    .getOne();
  if (!user) return next(new Unauthenticated(ErrCodes.INVALID_TOKEN, req.lang));
  const newToken = Tokens.generateAccessToken({
    id: user.id,
    roleId: user.role.id,
    isGuest: false,
    isVerified: user.isVerified,
    language: user.defLanguage,
    permissions: [],
    profileId: user.profile as unknown as string,
  } as IjwtPayload);
  res
    .status(200)
    .json({ success: true, message: 'token generated', data: { access_token: newToken } });
};
