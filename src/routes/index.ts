import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { roleRoutes } from './roles.routes';
import { permissionRoutes } from './permissions.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);   

router.use('/', (req, res, next) => {
  // console.log('New route handler');

  // Add your new route logic 
    res.json({ message: 'This is a basic route' });
    // Call next() to pass control to the next middleware or route handler
    // next();
}); // Example of a new route handler
// Example of another new route
router.use('/another-new-route', (req, res, next) => {
  console.log('Another new route handler');



  res.send('This is another new route');
  next();
});

export const apiRoutes = router;
