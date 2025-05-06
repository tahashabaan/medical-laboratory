import { Router } from 'express';
import * as handlers from '../controllers/auth';
import * as validators from '../validators/auth.validator';
import { isauthenticated } from '../guards/isauthenticated.guard';
import { isauthorized } from '../guards/isauthorized.guard';
import { PERMISSIONS } from '../constants/permissions';
import { labLoginHandler } from '../controllers/auth/lab-login.controller';
import { authenticateLap } from '../middlewares/authenticate-lap.middleware';

const router = Router();

router.post('/signup', validators.signup, handlers.signupHandler);
router.post('/signin', validators.signin, handlers.signinHandler);
router.post('/verify', validators.verify, handlers.verifyHandler);
router.post('/resend-code', validators.resendVerify, handlers.resendVerificationCode);
router.post(
  '/change-password',
  isauthenticated,
  validators.changePassword,
  handlers.changePasswordHandler,
);
router.post(
  '/change-email',
  isauthenticated,
  isauthorized(PERMISSIONS.update_email),
  validators.changeEmail,
  handlers.askChangeEmailHandler,
);
router.post('/refresh-token', validators.refreshUserToken, handlers.refreshUserToken);
router
  .route('/forget-password')
  .post(validators.askForgetPassword, handlers.askForgetPasswordHandler)
  .patch(validators.updateForgottenPassword, handlers.updateForgetenPasswordHandler);
router.post('/lab-login', validators.labLogin, authenticateLap, handlers.labLoginHandler);

export const authRoutes = router;
