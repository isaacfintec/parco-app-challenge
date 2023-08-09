import {
  CheckIn,
  CheckInFail,
  CheckInSuccess,
} from '../../../../core/interfaces/CheckIn';

export default abstract class Parking {
  checkIn: CheckIn;
  reply: CheckInFail | CheckInSuccess;

  constructor(checkIn) {
    this.checkIn = checkIn;
  }

  abstract validate(error);

  save() {
    const self = this;
    /**
     * TODO: create code to save operation;
     * const { parkingId } = self.checkIn
     * cont user = await searchUser()
     * saveCheckIn(parkingId, user)
     */
    return self.reply;
  }
}
