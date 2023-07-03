import AuthController from '../../controllers/AuthController';
import { IRoute } from '../../interfaces';

const authController = new AuthController();

const AuthRoutes: IRoute[] = [
  {
    path: '/register-email',
    method: 'post',
    action: authController.registerUserWithEmail,
    responses: [{ 200: 'success' }]
  },
  {
    path: '/email-login',
    method: 'post',
    action: authController.loginUserWithEmail,
    responses: [{ 200: 'success' }]
  }
];

export default AuthRoutes;
