import Parking, { ValidUpdatedProps } from '../../domain/models/Interface';
import { ParkingModel } from '../../domain/models/Model';
import ParkingRepository from '../../domain/repositories/Parking';

export default class UpdateUseCase {
  private async update(
    id: string | number,
    update: ValidUpdatedProps,
  ): Promise<ParkingModel> {
    const parkingRepo = new ParkingRepository();
    const newParking = await parkingRepo.update(id, update);
    return newParking;
  }

  async exec(
    id: string | number,
    update: ValidUpdatedProps,
  ): Promise<ParkingModel> {
    const self = this;
    const parking = await self.update(id, update);
    return parking;
  }
}
