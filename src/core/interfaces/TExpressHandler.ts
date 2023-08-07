import { Request, Response, NextFunction } from 'express';

export interface AddressInfo {
  address: string;
  family: string;
  port: number;
}

export type Address = AddressInfo | string | null;

export type TExpressHandler = (
  req: Request,
  reply: Response,
  next: NextFunction,
) => void;
