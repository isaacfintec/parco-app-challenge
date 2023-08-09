import Parking from '../../domain/models/Interface';
import { ParkingModel } from '../../domain/models/Model';
import ParkingRepository from '../../domain/repositories/Parking';

export default class CreateUseCase {
  private async create(parking: Parking): Promise<ParkingModel> {
    const parkingRepo = new ParkingRepository();
    const newParking = await parkingRepo.save(parking);
    return newParking;
  }

  async exec(parking: Parking): Promise<ParkingModel> {
    const self = this;
    const newParking = await self.create(parking);
    return newParking;
  }
}
