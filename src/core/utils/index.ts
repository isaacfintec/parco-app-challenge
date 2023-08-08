const { ENV, NODE_ENV } = process.env;
const ENVIRONMENT = ENV || NODE_ENV;

export const isProductionEnvironment = (): boolean => {
  return ENVIRONMENT === 'production';
};

export const isDevelopmentEnvironment = (): boolean => {
  return ENVIRONMENT === 'development';
};

export const isTestEnvironment = (): boolean => {
  return ENVIRONMENT === 'test';
};

export const getSkip = (page: number, limit: number): number => {
  if (page <= 1) return 0;
  const reducedPage = page - 1;
  const pageNumber = reducedPage * limit;
  return pageNumber;
};

export const formatContact = (
  phone: string,
): { contact: number; isValid: boolean } => {
  const phoneFormated = phone.replace(/([^0-9]+)/gi, '');
  const phoneLength = phoneFormated.length;
  const isValid = phoneLength <= 15 && phoneLength >= 10;
  return {
    contact: +phoneFormated,
    isValid,
  };
};
