import { generateJWT } from '../../../../core/utils';

export default class SessionUseCase {
  exec(): { session: string } {
    const session = generateJWT();
    return { session };
  }
}
