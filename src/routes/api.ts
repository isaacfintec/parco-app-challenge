import { Router } from 'express';

import AuthMiddleware from '../core/middlewares/Auth';
import parkingRoutes from '../entities/parking/infrastructure/routes';

const router = Router();
const authMiddleware = new AuthMiddleware();

router.use('/parking', authMiddleware.required(), parkingRoutes);

export default router;
