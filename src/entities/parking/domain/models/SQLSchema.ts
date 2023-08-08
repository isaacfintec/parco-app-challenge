import { Sequelize, DataTypes } from 'sequelize';
import { ParkingSQLModel } from './Model';
import { ALL_PARKING_TYPES } from '../../application/constants';

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const Parking: ParkingSQLModel = sequelize.define(
  'Parking',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 50,
        max: 1500,
      },
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parkingType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [ALL_PARKING_TYPES],
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  },
);

export default Parking;
