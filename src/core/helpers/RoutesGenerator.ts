import Router, { RequestHandler } from 'express';

interface IRoutes {
  path: string;
  method: string;
  handlers: RequestHandler[];
}

export default class RoutesGen {
  static exec(routes: IRoutes[]) {
    const router = Router();

    for (const route of routes) {
      const { method, path, handlers } = route;
      router[method](path, handlers);
    }

    return router;
  }

  static generateRoutes(routes) {
    const router = RoutesGen.exec(routes);
    return router;
  }
}
