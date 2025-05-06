import { Router } from 'express';
import * as sampleHandlers from '../controllers/samples/samples.controller';
import * as mediaHandlers from '../controllers/samples/sample-media.controller';
import { isauthenticated } from '../guards/isauthenticated.guard';
import { uploadMemoryStorage } from '../middlewares/upload-files.middleware';
// You may need to create validators for sample routes
// import * as validators from '../validators/samples.validator';

const router = Router();

// Apply authentication middleware to all routes
router.use(isauthenticated);

// Sample routes
router
  .route('/')
  .get(sampleHandlers.getSamplesHandler)
  .post(sampleHandlers.createSampleHandler);

router
  .route('/:sampleId')
  .get(sampleHandlers.getOneSampleHandler)
  .patch(sampleHandlers.updateSampleHandler)
  .delete(sampleHandlers.removeSampleHandler);

// Sample media routes
router.get(
  '/:sampleId/media',
  mediaHandlers.getSampleMediaHandler
);

router.post(
  '/:sampleId/media',
  uploadMemoryStorage({ fileType: ['image', 'video'] }).array('files', 10),
  mediaHandlers.uploadSampleMediaHandler
);

router.delete(
  '/media/:mediaId',
  mediaHandlers.deleteSampleMediaHandler
);

export const sampleRoutes = router;
