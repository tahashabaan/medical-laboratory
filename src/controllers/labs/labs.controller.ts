import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';
import { Bcrypt } from '../../utils/bcrypt';
import { Errors } from '../../errors';
import { ErrCodes } from '../../constants/error-code';

/**
 * @swagger
 * /labs:
 *   post:
 *     summary: Create a new laboratory (must select or create a subscription plan)
 *     tags: [Labs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               subscription_id:
 *                 type: string
 *                 description: Existing subscription plan ID
 *               subscription:
 *                 type: object
 *                 description: New subscription plan data
 *                 properties:
 *                   subscription_name:
 *                     type: string
 *                   subscription_price:
 *                     type: string
 *                   subscription_duration:
 *                     type: string
 *     responses:
 *       201:
 *         description: Laboratory created successfully
 *       400:
 *         description: Subscription plan is required
 */
export const createLabHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    email: string;
    password: string;
    phone?: string;
    address?: string;
    subscription_id?: string;
    subscription?: {
      subscription_name: string;
      subscription_price?: string;
      subscription_duration?: string;
    };
  }
> = async (req, res, next) => {
  // Prevent duplicate email
  const exists = await Models.Lap.findOne({ where: { email: req.body.email } });
  if (exists) return next(new Errors.BadRequest(ErrCodes.EMAIL_ALREADY_EXISTS, req.lang));
  // Require subscription data
  if (!req.body.subscription && !req.body.subscription_id) {
    return next(new Errors.BadRequest(ErrCodes.SUBSCRIPTION_REQUIRED, req.lang));
  }
  // Hash password
  const hashedPwd = await Bcrypt.hashPwd(req.body.password, 10);

  let subscriptionRef;
  let createdSubscriptionId: string | undefined;

  if (req.body.subscription) {
    // Create new subscription
    const subscription = await Models.Subscription.save({
      subscription_name: req.body.subscription.subscription_name,
      subscription_price: req.body.subscription.subscription_price,
      subscription_duration: req.body.subscription.subscription_duration,
    });
    subscriptionRef = { subscription_id: subscription.subscription_id };
    createdSubscriptionId = subscription.subscription_id;
  } else if (req.body.subscription_id) {
    subscriptionRef = { subscription_id: req.body.subscription_id };
  }

  const lab = await Models.Lap.save({
    email: req.body.email,
    password: hashedPwd,
    phone: req.body.phone,
    address: req.body.address,
    subscription: subscriptionRef,
  });

  res.status(201).json({
    success: true,
    message: 'Laboratory created successfully',
    data: {
      lap_id: lab.lap_id,
      subscription_id: createdSubscriptionId || req.body.subscription_id || null,
    },
  });
};

/**
 * @swagger
 * /labs/{labId}:
 *   get:
 *     summary: Get a laboratory by ID
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laboratory fetched successfully
 */
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

/**
 * @swagger
 * /labs:
 *   get:
 *     summary: Get all laboratories
 *     tags: [Labs]
 *     responses:
 *       200:
 *         description: Laboratories fetched successfully
 */
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

/**
 * @swagger
 * /labs/{labId}:
 *   patch:
 *     summary: Update a laboratory
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               subscription_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Laboratory updated successfully
 */
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

/**
 * @swagger
 * /labs/{labId}:
 *   delete:
 *     summary: Delete a laboratory
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laboratory deleted successfully
 */
export const removeLabHandler: RequestHandler<
  { labId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.Lap.delete({ lap_id: req.params.labId });
  
  res.status(200).json({ success: true, message: 'Laboratory deleted successfully', data: null });
};
