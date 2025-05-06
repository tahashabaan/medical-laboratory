import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';

export const createLabHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { email: string; password: string; phone?: string; address?: string; subscription_id?: string }
> = async (req, res, next) => {
  const lab = await Models.Lap.save({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    subscription: req.body.subscription_id ? { subscription_id: req.body.subscription_id } : undefined,
  });

  res
    .status(201)
    .json({ success: true, message: 'Laboratory created successfully', data: { lap_id: lab.lap_id } });
};

export const getOneLabHandler: RequestHandler<
  { labId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const lab = await Models.Lap.findOne({ 
    where: { lap_id: req.params.labId },
    relations: ['subscription', 'samples']
  });
  
  res.status(200).json({ success: true, message: 'Laboratory fetched successfully', data: lab });
};

export const getLabsHandler: RequestHandler<unknown, SuccessResponse, unknown> = async (
  req,
  res,
  next,
) => {
  const labs = await Models.Lap.find({
    relations: ['subscription']
  });
  
  res.status(200).json({ success: true, message: 'Laboratories fetched successfully', data: labs });
};

export const updateLabHandler: RequestHandler<
  { labId: string },
  SuccessResponse,
  { phone?: string; address?: string; subscription_id?: string }
> = async (req, res, next) => {
  await Models.Lap.update(
    { lap_id: req.params.labId },
    { 
      phone: req.body.phone,
      address: req.body.address,
      subscription: req.body.subscription_id ? { subscription_id: req.body.subscription_id } : undefined,
    }
  );

  res.status(200).json({ success: true, message: 'Laboratory updated successfully', data: null });
};

export const removeLabHandler: RequestHandler<
  { labId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.Lap.delete({ lap_id: req.params.labId });
  
  res.status(200).json({ success: true, message: 'Laboratory deleted successfully', data: null });
};
