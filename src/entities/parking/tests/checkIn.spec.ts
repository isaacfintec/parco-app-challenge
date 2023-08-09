import { expect } from 'chai';

import Repository from '../application/Parkings/Parking';
import CheckInUseCase from '../application/useCases/CheckIn';
import {
  CheckInReply,
  EParkingTypes,
  EUserType,
} from '../../../core/interfaces/CheckIn';
import { CheckInError } from '../../../core/helpers';

describe('@CheckIn', () => {
  let checkInUseCase: CheckInUseCase;

  before(async () => {
    checkInUseCase = new CheckInUseCase();
  });

  it('@CheckIn: should create a private parking', async () => {
    const checkIn = {
      parkingId: 'a1',
      userType: EUserType.corporate,
    };

    const parking: Partial<CheckInReply> = checkInUseCase.exec(checkIn);
    const { status, error, parkingType } = parking;

    if (error) {
      expect(error instanceof CheckInError).to.be.true;
      expect(status).to.be.equal(400);
      expect(error.message.includes('available only on weekdays')).to.be.true;
    } else {
      expect(status).to.be.equal(200);
      expect(parkingType).to.be.equal(EParkingTypes.private);
    }
  });

  it('@CheckIn: should create a courtesy parking', async () => {
    const checkIn = {
      parkingId: 'a1',
      userType: EUserType.visitor,
    };

    const parking: Partial<CheckInReply> = checkInUseCase.exec(checkIn);
    const { status, error, parkingType } = parking;

    if (error) {
      expect(error instanceof CheckInError).to.be.true;
      expect(status).to.be.equal(400);
      expect(error.message.includes('available only on weekends')).to.be.true;
    } else {
      expect(status).to.be.equal(200);
      expect(parkingType).to.be.equal(EParkingTypes.courtesy);
    }
  });

  it('@CheckIn: should create a public parking', async () => {
    const checkIn = {
      parkingId: 'a1',
      userType: EUserType.provider,
    };

    const parking: Partial<CheckInReply> = checkInUseCase.exec(checkIn);
    const { status, parkingType } = parking;

    expect(status).to.be.equal(200);
    expect(parkingType).to.be.equal(EParkingTypes.public);
  });
});
