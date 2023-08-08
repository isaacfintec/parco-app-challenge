import { PaginateProps } from '../interfaces';
import { DEFAULT_PAGE, DEFAULT_ORDER, DEFAULT_LIMIT } from '../constants';

export const getSkip = (page: number, limit: number): number => {
  if (page <= 1) return 0;
  const reducedPage = page - 1;
  const pageNumber = reducedPage * limit;
  return pageNumber;
};

export const formatPaginateProps = (query: PaginateProps) => {
  const page = query.skip || DEFAULT_PAGE;
  const order = query.order || DEFAULT_ORDER;
  const limit = query.limit || DEFAULT_LIMIT;
  const skip = getSkip(page, query.limit);
  return { order, skip, limit };
};
