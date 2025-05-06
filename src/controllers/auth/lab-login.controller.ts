import { RequestHandler } from 'express';
import { Tokens } from '../../utils/token';

export const labLoginHandler: RequestHandler = async (req, res) => {
  // The lab is attached by the authenticateLap middleware
  const lab = (req as any).lap;
  const token = Tokens.generateAccessToken({ id: lab.lap_id, isLab: true });
  res.status(200).json({
    success: true,
    message: 'Lab login successful',
    data: { token, labId: lab.lap_id, email: lab.email }
  });
};
