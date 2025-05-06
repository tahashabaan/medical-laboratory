import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { roleRoutes } from './roles.routes';
import { permissionRoutes } from './permissions.routes';
import { labRoutes } from './labs.routes';
import { subscriptionRoutes } from './subscriptions.routes';
import { sampleRoutes } from './samples.routes';
import { notificationRoutes } from './notifications.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/labs', labRoutes);
router.use('/subscriptions', subscriptionRoutes);
// router.use('/samples', sampleRoutes);
// router.use('/notifications', notificationRoutes);

router.use('/', (req, res) => {
  res.json({ message: 'api/v1 runnuing' });
});

// Example of another new route
router.use('/another-new-route', (req, res) => {
  console.log('Another new route handler');
  res.send('This is another new route');
});

export const apiRoutes = router;
