import { Sequelize } from 'sequelize';

import Parking from '../entities/parking/domain/models/SQLSchema';
import { isTestEnvironment } from './utils';

let sequelize: Sequelize;

if (isTestEnvironment()) {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
} else {
  sequelize = new Sequelize('postgres://postgres:pg123@localhost:5432/test', {
    logging: false,
  });
}

class SQL {
  async connect() {
    try {
      const db = await sequelize.authenticate();
      console.log(`SQL successfully connected!`);

      await Parking.sync();
      console.log(`Parking table was created`);

      return db;
    } catch (error) {
      console.error('Unable to connect to SQL database:', error);
    }
  }

  async close() {
    await sequelize.close();
  }
}

export default SQL;
