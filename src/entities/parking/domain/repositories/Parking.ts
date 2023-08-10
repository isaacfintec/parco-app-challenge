import {
  PaginateProps,
  PaginateReply,
  IDNum,
  IDStrg,
} from '../../../../core/interfaces';
import MongoRepo from './MongoAdapter';
import SQLRepo from './SQLAdapter';
import Parking, { ValidUpdatedProps } from '../models/Interface';
import { ParkingModel } from '../models/Model';

export default class Repository {
  store: SQLRepo | MongoRepo;

  constructor(db?: string) {
    this.store = this.selectAdapter(db);
  }

  private selectAdapter(db: string) {
    const dbSelector = db || process.env.DB;

    const dbByConfig = {
      mongo: MongoRepo,
      sql: SQLRepo,
      default: MongoRepo,
    };

    const DBhandle = dbByConfig[dbSelector] || dbByConfig.default;
    return new DBhandle();
  }

  async save(parkingProps: Parking): Promise<ParkingModel> {
    const self = this;
    const parking = await self.store.save(parkingProps);
    return parking;
  }

  async update(
    id: IDNum | IDStrg,
    update: ValidUpdatedProps,
  ): Promise<ParkingModel> {
    const self = this;
    const parking = await self.store.update(id, update);
    return parking;
  }

  async paginate(query: PaginateProps): Promise<PaginateReply<ParkingModel>> {
    const self = this;
    const parkings = await self.store.paginate(query);
    return parkings;
  }
}
