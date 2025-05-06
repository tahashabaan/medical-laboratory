import { Router } from 'express';
import * as handlers from '../controllers/notifications/notifications.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';
// You may need to create validators for notification routes
// import * as validators from '../validators/notifications.validator';

const router = Router();

// Apply authentication middleware to all routes
router.use(isauthenticated);

router
  .route('/')
  .get(handlers.getNotificationsHandler)
  .post(handlers.createNotificationHandler);

router
  .route('/:notificationId')
  .get(handlers.getOneNotificationHandler)
  .delete(handlers.deleteNotificationHandler);

export const notificationRoutes = router;
