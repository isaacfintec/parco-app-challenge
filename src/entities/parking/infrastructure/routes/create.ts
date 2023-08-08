import { createCtrl } from '../controllers';
import { createV } from '../validators';

const createValidator = createV();

const routes = [
  {
    path: '/',
    method: 'post',
    handlers: [createValidator, createCtrl],
  },
];

export default routes;
