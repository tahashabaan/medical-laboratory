import { Router } from 'express';
import * as handlers from '../controllers/subscriptions/subscriptions.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';
// You may need to create validators for subscription routes
// import * as validators from '../validators/subscriptions.validator';

const router = Router();

// Apply authentication middleware to all routes
router.use(isauthenticated);

router
  .route('/')
  .get(handlers.getSubscriptionsHandler)
  .post(handlers.createSubscriptionHandler);

router
  .route('/:subscriptionId')
  .get(handlers.getOneSubscriptionHandler)
  .patch(handlers.updateSubscriptionHandler)
  .delete(handlers.removeSubscriptionHandler);

export const subscriptionRoutes = router;
