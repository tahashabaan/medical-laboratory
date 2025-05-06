import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';

export const createSubscriptionHandler: RequestHandler<
  unknown,
  SuccessResponse,
  { 
    subscription_name: string;
    subscription_price?: string;
    subscription_duration?: string;
  }
> = async (req, res, next) => {
  const subscription = await Models.Subscription.save({
    subscription_name: req.body.subscription_name,
    subscription_price: req.body.subscription_price,
    subscription_duration: req.body.subscription_duration,
  });

  res.status(201).json({
    success: true,
    message: 'Subscription plan created successfully',
    data: { subscription_id: subscription.subscription_id }
  });
};

export const getOneSubscriptionHandler: RequestHandler<
  { subscriptionId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const subscription = await Models.Subscription.findOne({ 
    where: { subscription_id: req.params.subscriptionId },
    relations: ['laps']
  });
  
  res.status(200).json({ 
    success: true, 
    message: 'Subscription plan fetched successfully', 
    data: subscription 
  });
};

export const getSubscriptionsHandler: RequestHandler<unknown, SuccessResponse, unknown> = async (
  req,
  res,
  next,
) => {
  const subscriptions = await Models.Subscription.find();
  
  res.status(200).json({ 
    success: true, 
    message: 'Subscription plans fetched successfully', 
    data: subscriptions 
  });
};

export const updateSubscriptionHandler: RequestHandler<
  { subscriptionId: string },
  SuccessResponse,
  {
    subscription_name?: string;
    subscription_price?: string;
    subscription_duration?: string;
  }
> = async (req, res, next) => {
  await Models.Subscription.update(
    { subscription_id: req.params.subscriptionId },
    { 
      subscription_name: req.body.subscription_name,
      subscription_price: req.body.subscription_price,
      subscription_duration: req.body.subscription_duration,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Subscription plan updated successfully',
    data: null
  });
};

export const removeSubscriptionHandler: RequestHandler<
  { subscriptionId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.Subscription.delete({ subscription_id: req.params.subscriptionId });
  
  res.status(200).json({
    success: true,
    message: 'Subscription plan deleted successfully',
    data: null
  });
};
