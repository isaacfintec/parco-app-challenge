import { updateCtrl } from '../controllers';
import { updateV } from '../validators';

const updateValidator = updateV();

const routes = [
  {
    path: '/:id/update',
    method: 'put',
    handlers: [updateValidator, updateCtrl],
  },
];

export default routes;
