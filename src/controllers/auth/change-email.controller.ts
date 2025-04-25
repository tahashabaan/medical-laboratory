import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Errors } from '../../errors';
import { Models } from '../../models';
import { Bcrypt } from '../../utils/bcrypt';
import { ErrCodes } from '../../constants/error-code';
import { Crypto } from '../../utils/crypto';
import { VerifyReason } from '../../constants/verify-reason';
import { mailTransporter } from '../../utils/mail';

export const askChangeEmailHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    email: string;
    password: string;
  }
> = async (req, res, next) => {
  const user = await Models.User.findOne({
    where: { id: req.loggedUser.id },
    select: ['password'],
  });
  const isMatch = await Bcrypt.comparePwd(req.body.password, user!.password);
  if (!isMatch) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));

  if (await Models.User.findOne({ where: { email: req.body.email } }))
    return next(new Errors.BadRequest(ErrCodes.EMAIL_ALREADY_EXISTS, req.lang));

  const code = await Crypto.generateCode();
  const expirTime = new Date(Date.now() + 10 * 60 * 1000);

  await Models.User.update(
    { id: req.loggedUser.id },
    {
      verificationCode: Crypto.hashCode(code),
      verificationExpireAt: expirTime,
      verificationReason: VerifyReason.updateEmail,
      verificationTempEmail: req.body.email,
    },
  );

  res.status(200).json({
    success: true,
    message: 'Verification code has been sent to your new email',
    data: {},
  });

  await mailTransporter.sendMail({
    to: req.body.email,
    subject: 'Email Verification',
    html: `<h1> Your verification code is ${code} </h1>`,
  });
};
