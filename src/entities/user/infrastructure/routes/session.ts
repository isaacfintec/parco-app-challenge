import { sessionCtrl } from '../controller';

const routes = [
  {
    path: '/',
    method: 'get',
    handlers: [sessionCtrl],
  },
];

export default routes;
