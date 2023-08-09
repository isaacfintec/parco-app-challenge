import STATUS_CODES from 'http-status-codes';

import { PaginateProps, TExpressHandler } from '../../../../core/interfaces';
import PaginateUseCase from '../../application/useCases/Paginate';

const PaginateController: TExpressHandler = async (req, reply, next) => {
  try {
    const { query } = req;

    const paginateUseCase = new PaginateUseCase();
    const result = await paginateUseCase.exec(query);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default PaginateController;
