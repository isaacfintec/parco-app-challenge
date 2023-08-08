import { Schema, SchemaTypes, model } from 'mongoose';

import { ParkingMongoModel } from './Model';
import { ALL_PARKING_TYPES } from '../../application/constants';

const schema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      unique: true,
    },
    spots: {
      type: SchemaTypes.Number,
      min: 50,
      max: 1500,
    },
    contact: {
      type: SchemaTypes.Number,
    },
    parkingType: {
      type: SchemaTypes.String,
      enum: ALL_PARKING_TYPES,
    },
  },
  { timestamps: true },
);

schema.index({ name: 1 });

export default model<ParkingMongoModel>('parkings', schema);
