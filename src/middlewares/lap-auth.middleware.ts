import { RequestHandler } from 'express';
import { Tokens } from '../utils/token';
import { Models } from '../models';
import { Errors } from '../errors';
import { ErrCodes } from '../constants/error-code';

export const lapAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new Errors.Unauthenticated(ErrCodes.UNAUTHENTICATED, req.lang));
  }
  const token = authHeader.split(' ')[1];
  let payload: any;
  try {
    payload = Tokens.verifyToken(token);
  } catch {
    return next(new Errors.Unauthenticated(ErrCodes.UNAUTHENTICATED, req.lang));
  }
  if (!payload?.isLab || !payload?.id) {
    return next(new Errors.Unauthorized(ErrCodes.UNAUTHORIZED, req.lang));
  }
  const lab = await Models.Lap.findOne({ where: { lap_id: payload.id } });
  if (!lab) {
    return next(new Errors.Unauthorized(ErrCodes.UNAUTHORIZED, req.lang));
  }
  (req as any).lab = lab;
  next();
};
