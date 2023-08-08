import { expressjwt } from 'express-jwt';
import { Request } from 'express';

import { TExpressHandler } from '../interfaces/TExpressHandler';

class AuthMiddleware {
  JWT_SECRET: string;
  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  getTokenFromHeaders(req: Request) {
    const { headers } = req;
    const { authorization } = headers || {};
    const [type, token] = authorization ? authorization.split(' ') : [];
    const isTokenType = type === 'Token';
    const isBearerType = type === 'Bearer';
    const isValidType = isTokenType || isBearerType;
    if (!isValidType) return null;
    return token;
  }

  required(): TExpressHandler {
    const { getTokenFromHeaders } = this;
    return expressjwt({
      secret: this.JWT_SECRET,
      requestProperty: 'payload',
      getToken: getTokenFromHeaders,
      algorithms: ['HS256'],
    });
  }
}

export default AuthMiddleware;
