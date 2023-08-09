import { CheckIn, UserType } from '../../../../core/interfaces';
import ParkingFactory from '../Parkings/ParkingFactory';

export default class CheckInUseCase {
  createParking(userType: UserType) {
    return ParkingFactory.create(userType);
  }

  exec(checkIn: CheckIn) {
    const self = this;
    const parking = self.createParking(checkIn.userType);
    return parking(checkIn).validate().save();
  }
}
