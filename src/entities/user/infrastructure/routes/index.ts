import { RoutesGen } from '../../../../core/helpers';
import sessionRoutes from './session';

const routes = [...sessionRoutes];

const router = RoutesGen.generateRoutes(routes);

export default router;
