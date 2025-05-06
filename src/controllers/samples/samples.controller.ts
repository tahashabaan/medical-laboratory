import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';

export const createSampleHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    user_name: string;
    user_email?: string;
    user_phone?: string;
    description?: string;
    lap_id: string;
  }
> = async (req, res, next) => {
  const sample = await Models.Sample.save({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_phone: req.body.user_phone,
    description: req.body.description,
    status: 'pending',
    result: '0',
    lap: { lap_id: req.body.lap_id },
  });

  res.status(201).json({
    success: true,
    message: 'Sample created successfully',
    data: { sample_id: sample.sample_id }
  });
};

export const getOneSampleHandler: RequestHandler<
  { sampleId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const sample = await Models.Sample.findOne({ 
    where: { sample_id: req.params.sampleId },
    relations: ['lap', 'sampleMedia', 'notification']
  });
  
  res.status(200).json({ success: true, message: 'Sample fetched successfully', data: sample });
};

export const getSamplesHandler: RequestHandler<unknown, SuccessResponse, unknown> = async (
  req,
  res,
  next,
) => {
  const samples = await Models.Sample.find({
    relations: ['lap']
  });
  
  res.status(200).json({ success: true, message: 'Samples fetched successfully', data: samples });
};

export const updateSampleHandler: RequestHandler<
  { sampleId: string },
  SuccessResponse,
  {
    user_name?: string;
    user_email?: string;
    user_phone?: string;
    description?: string;
    status?: 'pending' | 'in progress' | 'completed' | 'failed' | 'cancelled';
    result?: string;
  }
> = async (req, res, next) => {
  await Models.Sample.update(
    { sample_id: req.params.sampleId },
    { 
      // // user_name: req.body.user_name,
      // // user_email: req.body.user_email,
      // user_phone: req.body.user_phone,
      description: req.body.description,
      status: req.body.status,
      result: req.body.result,
    }
  );

  res.status(200).json({ success: true, message: 'Sample updated successfully', data: null });
};

export const removeSampleHandler: RequestHandler<
  { sampleId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.Sample.delete({ sample_id: req.params.sampleId });
  
  res.status(200).json({ success: true, message: 'Sample deleted successfully', data: null });
};
