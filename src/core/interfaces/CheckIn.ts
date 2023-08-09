import { CheckInError } from '../helpers';

export enum EUserType {
  provider = 'provider',
  corporate = 'corporate',
  visitor = 'visitor',
}

export enum EParkingTypes {
  public = 'public',
  private = 'private',
  courtesy = 'courtesy',
}

export type UserType = keyof typeof EUserType;
export type ParkingType = keyof typeof EParkingTypes;

export interface CheckIn {
  parkingId: string;
  userType: UserType;
}

export interface CheckInReply {
  status: number;
  parkingType: ParkingType;
  error: CheckInError;
}

export type CheckInSuccess = Omit<CheckInReply, 'error'>;
export type CheckInFail = Omit<CheckInReply, 'parkingType'>;
