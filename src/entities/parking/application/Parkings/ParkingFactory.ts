import { CheckIn } from '../../../../core/interfaces';
import { PrivateParking, CourtesyParking, PublicParking } from '.';
import { UserType } from '../../../../core/interfaces/CheckIn';

export default class ParkingFactory {
  static create(userType: UserType) {
    const parkings = {
      corporate: (props: CheckIn) => new PrivateParking(props),
      visitor: (props: CheckIn) => new CourtesyParking(props),
      provider: (props: CheckIn) => new PublicParking(props),
      default: (props: CheckIn) => new PublicParking(props),
    };

    const parking = parkings[userType];
    return parking;
  }
}
