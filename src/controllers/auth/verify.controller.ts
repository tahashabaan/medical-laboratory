import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Errors } from '../../errors';
import { Models } from '../../models';
import { ErrCodes } from '../../constants/error-code';
import { Crypto } from '../../utils/crypto';
import { VerifyReason } from '../../constants/verify-reason';
import { mailTransporter } from '../../utils/mail';
import { env } from '../../config/env';
import { FindOptionsWhere } from 'typeorm';
import { UserEntity } from '../../models/user.model';

const isExpired = (date: Date) => {
  const currentTime = Date.now();
  const expireTime = date.getTime();
  return currentTime > expireTime;
};

export const verifyHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { email: string; code: string }
> = async (req, res, next) => {
  const user = await Models.User.findOne({ where: { email: req.body.email } });
  if (!user) return next(new Errors.BadRequest(ErrCodes.INVALID_VERIFICATION_CODE, req.lang));

  if (!user.verificationReason && user.isVerified)
    return next(new Errors.BadRequest(ErrCodes.NO_REASON_TO_VERIFY, req.lang));
  if (env.environment !== 'development')
    if (user.verificationCode !== Crypto.hashCode(req.body.code))
      if (user.verificationExpireAt && isExpired(new Date(user.verificationExpireAt || 0)))
        return next(new Errors.BadRequest(ErrCodes.EXPIRED_CODE, req.lang));

  let responseData: Record<string, string> = {};
  let updateDate: FindOptionsWhere<UserEntity> = {
    verificationCode: undefined,
    verificationExpireAt: undefined,
    verificationTempEmail: undefined,
  };
  // user ask update his forgeten password
  if (user.verificationReason === VerifyReason.updatePassword) {
    await Models.User.update(
      { id: user.id },
      { verificationReason: VerifyReason.updatePasswordVerified },
    );
  }
  // user verify his account
  else if (user.verificationReason === VerifyReason.signup) {
    updateDate.isVerified = true;
    updateDate.verificationReason = undefined;
  }
  // user update his email
  else if (user.verificationReason === VerifyReason.updateEmail) {
    updateDate.verificationCode = undefined;
    updateDate.email = user.verificationTempEmail;
    if (!user.verificationTempEmail)
      return next(new Errors.BadRequest(ErrCodes.INVALID_DATA, req.lang));
  }

  await Models.User.update({ id: user.id }, updateDate as any);

  res.status(200).json({ success: true, message: 'User has been verified', data: responseData });
};

export const resendVerificationCode: RequestHandler<
  unknown,
  SuccessResponse,
  { email: string }
> = async (req, res, next) => {
  const user = await Models.User.findOne({
    where: { email: req.body.email },
  });
  if (!user) return next(new Errors.BadRequest(ErrCodes.NO_REASON_TO_RESEND_CODE, req.lang));
  const currentTime = Date.now();
  const expireTime = new Date(user.verificationExpireAt || '0').getTime();
  const remainingTimeToResendInSec = Math.floor((expireTime - currentTime) / 1000);

  if (user.verificationReason === null || user.verificationReason === undefined)
    return next(new Errors.BadRequest(ErrCodes.NO_REASON_TO_RESEND_CODE, req.lang));
  if (currentTime < expireTime)
    return res.status(200).json({
      success: false,
      message: 'You have to wait before sending the code again',
      data: {
        remainingTime: remainingTimeToResendInSec,
      },
    });

  const expireAt = new Date(Date.now() + 10 * 60 * 1000);
  const code = await Crypto.generateCode();

  await Models.User.update(
    { id: user.id },
    { verificationCode: Crypto.hashCode(code), verificationExpireAt: expireAt },
  );

  res.status(200).json({
    success: true,
    message: 'Code sent Successfully',
    data: {
      expireAt,
      reason: VerifyReason[user.verificationReason],
    },
  });

  await mailTransporter.sendMail({
    to: user.email,
    subject: 'Verification Code',
    html: `<p>Your verification code is: ${code}</p>`,
  });
};
