import { RequestHandler } from 'express';
import { Models } from '../models';
import { Bcrypt } from '../utils/bcrypt';
import { Errors } from '../errors';
import { ErrCodes } from '../constants/error-code';

export const authenticateLap: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const lab = await Models.Lap.findOne({ where: { email }, select: ['lap_id', 'email', 'password'] });
  console.log('lab', lab!.email);
  if (!lab?.email) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));
  const isMatch = await Bcrypt.comparePwd(password, lab.password);
  console.log('isMatch', isMatch);
  if (!isMatch) return next(new Errors.BadRequest(ErrCodes.INVALID_CREDINTIALS, req.lang));
  (req as any).lap = lab;
  next();
};
