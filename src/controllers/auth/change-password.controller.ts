import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Errors } from '../../errors';
import { env } from '../../config/env';
import { Models } from '../../models';
import { Bcrypt } from '../../utils/bcrypt';
import { ErrCodes } from '../../constants/error-code';

export const changePasswordHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    oldPassword: string;
    newPassword: string;
  }
> = async (req, res, next) => {
  const user = await Models.User.findOne({
    where: { id: req.loggedUser.id },
    select: ['password'],
  });
  const isMatch = await Bcrypt.comparePwd(req.body.oldPassword, user!.password, env.bcrypt.paper);
  if (!isMatch) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));
  const hashedPwd = await Bcrypt.hashPwd(req.body.newPassword, env.bcrypt.salt, env.bcrypt.paper);
  await Models.User.update({ id: req.loggedUser.id }, { password: hashedPwd });
  res.send({ success: true, message: 'Password has been changed successfully', data: {} });
};
