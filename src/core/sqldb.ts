import { Sequelize } from 'sequelize';

import Parking from '../entities/parking/domain/models/SQLSchema';

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

class SQL {
  async connect() {
    try {
      const db = await sequelize.authenticate();
      console.log(`SQLite successfully connected!`);

      await Parking.sync();
      console.log(`Parking table was created`);

      return db;
    } catch (error) {
      console.error('Unable to connect to SQLite database:', error);
    }
  }

  async close() {
    await sequelize.close();
  }
}

export default SQL;
