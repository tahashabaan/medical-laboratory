import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';
import { Errors } from '../../errors';
import { env } from '../../config/env';
import { ErrCodes } from '../../constants/error-code';
import { Crypto } from '../../utils/crypto';
import { VerifyReason } from '../../constants/verify-reason';
import { mailTransporter } from '../../utils/mail';
import { Tokens } from '../../utils/token';
import { Bcrypt } from '../../utils/bcrypt';

export const askForgetPasswordHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { email: string }
> = async (req, res, next) => {
  const user = await Models.User.findOne({
    where: { email: req.body.email },
    select: ['isVerified'],
  });
  if (!user) return next(new Errors.BadRequest(ErrCodes.EMAIL_NOT_FOUND, req.lang));

  // if (user.isVerified === false)
  //   return next(new Errors.BadRequest(ErrCodes.USER_NOT_VERIFIED, req.lang));

  const code = await Crypto.generateCode();
  const expirTime = new Date(Date.now() + 10 * 60 * 1000);

  await Models.User.update(
    { email: req.body.email },
    {
      verificationCode: Crypto.hashCode(code),
      verificationExpireAt: expirTime,
      verificationReason: VerifyReason.updatePassword,
    },
  );

  res.status(200).json({
    success: true,
    message: 'Verification code has been sent to your email',
    data: {},
  });

  await mailTransporter.sendMail({
    to: req.body.email,
    subject: 'Forget Password',
    html: `<h1> Your verification code is ${code} </h1>`,
  });
};

export const updateForgetenPasswordHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { email: string; newPassword: string }
> = async (req, res, next) => {
  const user = await Models.User.findOne({ where: { email: req.body.email } });
  if (!user) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS));

  if (user.verificationReason !== VerifyReason.updatePasswordVerified)
    return next(new Errors.BadRequest(ErrCodes.VERIFICATION_CODE_NOT_VERIFIED, req.lang));

  user.token = Tokens.generateRefreshToken({ id: user.id });
  user.password = await Bcrypt.hashPwd(req.body.newPassword, env.bcrypt.salt, env.bcrypt.paper);
  user.verificationCode = undefined;
  user.verificationExpireAt = undefined;
  user.verificationReason = undefined;

  await Models.User.save(user);

  return res.status(200).json({
    success: true,
    message: 'Password has been updated successfully',
    data: {},
  });
};
