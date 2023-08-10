import StatusCodes from 'http-status-codes';
import { CustomError } from './helpers/CustomErrors';
import { Request, Response } from 'express';

interface ErrorHandle {
  status: number;
  error: CustomError;
}

const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

const getResponse = (
  type: string,
  message: string,
  status?: number,
): ErrorHandle => ({
  status,
  error: new CustomError(type, message),
});

const dbErrorsHandler = (type: string, message: string): ErrorHandle => {
  const errorResponseHandlers = {
    CastError: () => getResponse(type, message, BAD_REQUEST),
    ValidationError: () => getResponse(type, message, BAD_REQUEST),
    default: () => getResponse(type, message),
  };

  const handle = errorResponseHandlers[type] || errorResponseHandlers.default;
  return handle();
};

const evalueError = (err: Error): ErrorHandle => {
  const instance = err.constructor.name;
  const type = err.name;
  const { message } = err;

  const errorResponseHandlers = {
    DatabaseError: () => dbErrorsHandler(type, message),
    MongooseError: () => dbErrorsHandler(type, message),
    MongoError: () => dbErrorsHandler(type, message),
    default: () =>
      getResponse(type, 'INTERNAL_SERVER_ERROR', INTERNAL_SERVER_ERROR),
  };
  const handle =
    errorResponseHandlers[instance] || errorResponseHandlers.default;
  return handle();
};

const globalErrors = (err: Error, req: Request, res: Response) => {
  const errorHandle: ErrorHandle = evalueError(err);
  return res
    .status(errorHandle.status || INTERNAL_SERVER_ERROR)
    .json({ errors: [errorHandle.error] });
};

export default globalErrors;
