import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/interfaces';
import UpdateUseCase from '../../application/useCases/Update';

const UpdateController: TExpressHandler = async (req, reply, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const updateUseCase = new UpdateUseCase();
    const result = await updateUseCase.exec(id, body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default UpdateController;
