import Parking from './Parking';
import { CheckIn } from '../../../../core/interfaces/CheckIn';
import {
  isWeekend,
  onCheckInFail,
  onCheckInSuccess,
} from '../../../../core/utils';

export default class CourtesyParking extends Parking {
  readonly name = 'courtesy';

  constructor(checkIn: CheckIn) {
    super(checkIn);
  }

  validate(): CourtesyParking {
    const self = this;
    const isValid = isWeekend();

    if (isValid) {
      self.reply = onCheckInSuccess(self.name);
    } else {
      self.reply = onCheckInFail(
        'Unable to preocess: available only on weekends',
      );
    }

    return self;
  }
}
