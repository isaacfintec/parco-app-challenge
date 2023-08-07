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
