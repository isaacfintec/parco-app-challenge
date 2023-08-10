import Parking from './Parking';
import { CheckIn } from '../../../../core/interfaces/CheckIn';
import { onCheckInSuccess } from '../../../../core/utils';

export default class PublicParking extends Parking {
  readonly name = 'public';

  constructor(checkIn: CheckIn) {
    super(checkIn);
  }

  validate() {
    const self = this;
    self.reply = onCheckInSuccess(self.name);
    return self;
  }
}
