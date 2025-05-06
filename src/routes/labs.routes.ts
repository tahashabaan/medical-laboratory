import { Router } from 'express';
import * as handlers from '../controllers/labs/labs.controller';
import {lapAuth} from '../middlewares/lap-auth.middleware';

const router = Router();

// Apply authentication middleware to all routes
// router.use(lapAuth);

router
  .get('/', handlers.getLabsHandler)
  .post('/subscription', handlers.createLabHandler);

router
  .route('/:labId')
  .get(lapAuth, handlers.getOneLabHandler)
  .patch(lapAuth, handlers.updateLabHandler)
  .delete(lapAuth, handlers.removeLabHandler);

export const labRoutes = router;
