import { paginateCtrl } from '../controllers';
import { paginateV } from '../validators';

const paginateValidator = paginateV();

const routes = [
  {
    path: '/paginate',
    method: 'get',
    handlers: [paginateValidator, paginateCtrl],
  },
];

export default routes;
