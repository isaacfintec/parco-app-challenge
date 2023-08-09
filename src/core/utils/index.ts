import jwt from 'jsonwebtoken';
import { CheckInError } from '../helpers';
import { CheckInFail, CheckInSuccess, ParkingType } from '../interfaces';

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

export const generateExpirationDate = (): number => {
  const EXPIRATION_DAYS = 7;
  const SECOND = 1000;
  let newDate: any = new Date();
  newDate = newDate.setDate(newDate.getDate() + EXPIRATION_DAYS);
  const seconds = newDate.valueOf() / SECOND;
  const expirationDate = Math.ceil(seconds);
  return expirationDate;
};

export const generateJWT = (): string => {
  const expirationDate = generateExpirationDate();
  const { JWT_SECRET } = process.env;
  return jwt.sign(
    {
      id: 'userId_example',
      exp: expirationDate,
    },
    JWT_SECRET,
  );
};

export function customValidationForSpots(value, { req }) {
  const gt = value > 1500;
  const lt = value < 50;
  if (lt) throw new Error('The parking is very small');
  else if (gt) throw new Error('The parking lot is very big');
  return true;
}

export const isWeekend = () => {
  const now = new Date();
  return now.getDay() === 6 || now.getDay() === 0;
};

export const onCheckInFail = (message: string): CheckInFail => {
  const status = 400;
  return {
    status,
    error: new CheckInError(status, message),
  };
};

export const onCheckInSuccess = (parkingType: ParkingType): CheckInSuccess => {
  const status = 200;
  return {
    status,
    parkingType,
  };
};
