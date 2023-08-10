import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/interfaces';
import CreateUseCase from '../../application/useCases/Create';

const CreateController: TExpressHandler = async (req, reply, next) => {
  try {
    const { body } = req;

    const createUseCase = new CreateUseCase();
    const result = await createUseCase.exec(body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default CreateController;
