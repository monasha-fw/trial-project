import { Application as ExpressApp, Router } from 'express';
import { flatMap } from 'lodash';
import { authorize } from '../middlewares/checkJWT';
import AppRoutes from './v1';
import { IRoute } from '../interfaces';

export default class Routes {
  public router: any = Router();

  public v1Routes(app: ExpressApp): void {
    app.use('/api/v1', this.router);

    flatMap(Object.entries(AppRoutes), (routeBuilder:any) => {
      const routeBasePath = routeBuilder[0];
      const routeData = routeBuilder[1];

      return routeData.map((route: { path: string }) => {
        // log.debug(`/${routeBasePath}${route.path}`);

        return {
          ...route,
          path: `/${routeBasePath}${route.path}`
        };
      });
    }).forEach((route: IRoute) => {
      const middlewares: any = [];

      if (route.authorizeFor) {
        middlewares.push(authorize(route.authorizeFor));
      }

      if (route.multer) {
        middlewares.push(route.multer);
      }

      this.router[route.method](route.path, middlewares, route.action);
    });
  }
}
