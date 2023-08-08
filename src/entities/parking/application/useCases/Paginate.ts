import { PaginateProps, PaginateReply } from '../../../../core/interfaces';
import { ParkingModel } from '../../domain/models/Model';
import ParkingRepository from '../../domain/repositories/Parking';

export default class UpdateUseCase {
  private async pagination(
    query: PaginateProps,
  ): Promise<PaginateReply<ParkingModel>> {
    const parkingRepo = new ParkingRepository();
    const newParking = await parkingRepo.paginate(query);
    return newParking;
  }

  async exec(query: PaginateProps): Promise<PaginateReply<ParkingModel>> {
    const self = this;
    const parking = await self.pagination(query);
    return parking;
  }
}
