import { Types } from 'mongoose';

export interface PaginateProps {
  limit?: number;
  skip?: number;
  order?: string;
  sort?: string;
}

export interface PaginateReply<T = any> {
  totalItems: number;
  data: T[];
}

export type IDNum = number;
export type IDStrg = string | Types.ObjectId;
