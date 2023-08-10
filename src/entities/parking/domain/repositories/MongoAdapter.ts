import { PaginateProps, PaginateReply } from '../../../../core/interfaces';
import MongoSchema from '../models/MongoSchema';
import { ParkingModel } from '../models/Model';
import Parking, { ValidUpdatedProps } from '../models/Interface';

import { formatPaginateProps } from '../../../../core/helpers/formatPaginateProps';
import { Types } from 'mongoose';

export default class MongoRepository {
  save(parkingProps: Parking): Promise<ParkingModel> {
    const parking = new MongoSchema(parkingProps);
    return parking.save();
  }

  update(id: unknown, update: ValidUpdatedProps) {
    const parkingUpdated = MongoSchema.findByIdAndUpdate(id, update, {
      new: true,
    });
    return parkingUpdated.exec();
  }

  async paginate(query: PaginateProps): Promise<PaginateReply<ParkingModel>> {
    const { skip, limit, order, sort } = formatPaginateProps(query);

    const orderTypes = {
      asc: 1,
      desc: -1,
    };

    const parkings = await MongoSchema.find()
      .sort({ [order]: orderTypes[sort] || -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      totalItems: parkings.length,
      data: parkings,
    };
  }
}
