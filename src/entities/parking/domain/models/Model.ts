import { Model, ModelDefined, Optional } from 'sequelize';
import { Document } from 'mongoose';

export class ParkingMongoModel extends Document {
  _id: string;
  name: string;
  spots: number;
  contact: number;
  parkingType: string;
  id?: string;
}

export class SQLModel extends Model {
  id: number;
  name: string;
  spots: number;
  contact: number;
  parkingType: string;
  _id?: number;
}

export type ParkingModelHidrated = Optional<SQLModel, 'id'>;

export type ParkingSQLModel = ModelDefined<SQLModel, ParkingModelHidrated>;

export type ParkingModel = ParkingMongoModel | SQLModel;
