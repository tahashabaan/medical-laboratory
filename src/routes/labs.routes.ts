import { Router } from 'express';
import * as handlers from '../controllers/labs/labs.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';

const router = Router();

// Apply authentication middleware to all routes
router.use(isauthenticated);

router
  .route('/')
  .get(handlers.getLabsHandler)
  .post(handlers.createLabHandler);

router
  .route('/:labId')
  .get(handlers.getOneLabHandler)
  .patch(handlers.updateLabHandler)
  .delete(handlers.removeLabHandler);

export const labRoutes = router;
