import { PaginateProps, PaginateReply } from '../../../../core/interfaces';
import { formatPaginateProps } from '../../../../core/helpers';
import SQLSchema from '../models/SQLSchema';
import { ParkingSQLModel, SQLModel, ParkingModel } from '../models/Model';
import Parking, { ValidUpdatedProps } from '../models/Interface';

export default class SQLRepository {
  async save(parkingProps: Parking): Promise<SQLModel> {
    const parking = await SQLSchema.create(parkingProps);
    return parking.dataValues;
  }

  async update(id: unknown, update: ValidUpdatedProps): Promise<SQLModel> {
    const query = { where: { id } };
    await SQLSchema.update(update, query);
    const parking = await SQLSchema.findOne(query);
    return parking.dataValues;
  }

  async paginate(query: PaginateProps): Promise<PaginateReply<ParkingModel>> {
    const { skip, limit, order, sort } = formatPaginateProps(query);

    const orderTypes = {
      asc: 'ASC',
      desc: 'DESC',
    };
    const orderType = orderTypes[sort] || orderTypes.desc;

    const parkings = await SQLSchema.findAll({
      offset: skip,
      limit,
      order: [[order, orderType]],
    });

    return {
      totalItems: parkings.length,
      data: parkings.map((v) => v.dataValues),
    };
  }
}
