import STATUS_CODES from 'http-status-codes';
import { TExpressHandler } from '../../../../core/interfaces';
import SessionUseCase from '../../application/useCases/Session';

const SessionController: TExpressHandler = async (req, reply, next) => {
  try {
    const sessionUseCase = new SessionUseCase();
    const result = await sessionUseCase.exec();
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default SessionController;
