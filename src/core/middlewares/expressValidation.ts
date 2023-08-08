import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import HTTP_CODE from 'http-status-codes';

class InvalidParameterError extends Error {
  code: string;

  constructor(message) {
    super();
    this.code = 'INVALID_PARAMETER';
    this.message = `Error: ${message}`;
  }
}

const formatErrors = (errors: ValidationError[]) => {
  const newErros = [...errors].map((error) => {
    const { param, value, msg } = error;
    const lastPram = param.split('.').pop();
    const message = `${lastPram} "${value}" ${msg}`;
    return new InvalidParameterError(message);
  });
  return newErros;
};

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatedErrors = formatErrors(errors.array());
    return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: formatedErrors });
  }
  return next();
};

export default validation;
