import { RequestHandler } from 'express';
import { SuccessResponse } from '../../types/responses';
import { Models } from '../../models';

export const createNotificationHandler: RequestHandler<
  unknown,
  SuccessResponse,
  {
    sample_id: string;
    notification_name: string;
    notification_description?: string;
  }
> = async (req, res, next) => {
  // Check if notification already exists for this sample
  const existingNotification = await Models.SampleNotification.findOne({
    where: { sample_id: req.body.sample_id }
  });

  if (existingNotification) {
    // Update the existing notification
    await Models.SampleNotification.update(
      { sample_notification_id: existingNotification.sample_notification_id },
      {
        notification_name: req.body.notification_name,
        notification_description: req.body.notification_description
      }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Notification updated successfully',
      data: { sample_notification_id: existingNotification.sample_notification_id }
    });
  }

  // Create new notification
  const notification = await Models.SampleNotification.save({
    sample_id: req.body.sample_id,
    notification_name: req.body.notification_name,
    notification_description: req.body.notification_description,
    sample: { sample_id: req.body.sample_id }
  });

  res.status(201).json({
    success: true,
    message: 'Notification created successfully',
    data: { sample_notification_id: notification.sample_notification_id }
  });
};

export const getNotificationsHandler: RequestHandler<unknown, SuccessResponse, unknown> = async (
  req,
  res,
  next,
) => {
  const notifications = await Models.SampleNotification.find({
    relations: ['sample']
  });
  
  res.status(200).json({
    success: true,
    message: 'Notifications fetched successfully',
    data: notifications
  });
};

export const getOneNotificationHandler: RequestHandler<
  { notificationId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  const notification = await Models.SampleNotification.findOne({
    where: { sample_notification_id: req.params.notificationId },
    relations: ['sample']
  });
  
  res.status(200).json({
    success: true,
    message: 'Notification fetched successfully',
    data: notification
  });
};

export const deleteNotificationHandler: RequestHandler<
  { notificationId: string },
  SuccessResponse,
  unknown
> = async (req, res, next) => {
  await Models.SampleNotification.delete({ sample_notification_id: req.params.notificationId });
  
  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully',
    data: null
  });
};
