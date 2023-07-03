import { IRoute } from '../../interfaces';
import RoleController from '../../controllers/RoleController';

const controller = new RoleController();

const Routes: IRoute[] = [
  {
    path: '/',
    method: 'post',
    action: controller.addNewRole,
    responses: [{ 204: 'no content' }]
  },
  {
    path: '/',
    method: 'get',
    action: controller.getRoles,
    responses: [{ 200: 'success' }]
  }
];

export default Routes;
