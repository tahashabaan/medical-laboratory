import { Router } from 'express';
import * as handlers from '../controllers/subscriptions/subscriptions.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';
import {lapAuth} from '../middlewares/lap-auth.middleware';
// You may need to create validators for subscription routes
// import * as validators from '../validators/subscriptions.validator';

const router = Router();

// Apply authentication middleware to all routes
// router.use(isauthenticated);

router
  .route('/')
  .get(lapAuth, handlers.getSubscriptionsHandler)
  .post(handlers.createSubscriptionHandler);

router
  .route('/:subscriptionId')
  .get(lapAuth, handlers.getOneSubscriptionHandler)
  .patch(lapAuth, handlers.updateSubscriptionHandler)
  .delete(lapAuth, handlers.removeSubscriptionHandler);

export const subscriptionRoutes = router;
