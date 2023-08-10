/* eslint-disable no-restricted-syntax */
import { RoutesGen } from '../../../../core/helpers';
import createRoutes from './create';
import updateRoutes from './update';
import paginateRoutes from './pagination';

const routes = [...paginateRoutes, ...createRoutes, ...updateRoutes];

const router = RoutesGen.generateRoutes(routes);

export default router;
