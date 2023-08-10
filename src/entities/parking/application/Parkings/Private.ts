import Parking from './Parking';
import { CheckIn } from '../../../../core/interfaces/CheckIn';
import {
  isWeekend,
  onCheckInFail,
  onCheckInSuccess,
} from '../../../../core/utils';

export default class PrivateParking extends Parking {
  readonly name = 'private';

  constructor(checkIn: CheckIn) {
    super(checkIn);
  }

  validate(): PrivateParking {
    const self = this;
    const isValid = !isWeekend();

    if (isValid) {
      self.reply = onCheckInSuccess(self.name);
    } else {
      self.reply = onCheckInFail(
        'Unable to preocess: available only on weekdays',
      );
    }

    return self;
  }
}
