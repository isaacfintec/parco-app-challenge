import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Mongoose } from 'mongoose';

class MongoMemory {
  replset: MongoMemoryServer;
  uri: string;
  db: Mongoose;

  async connect(): Promise<Mongoose> {
    const DEBUG = false;
    this.replset = await MongoMemoryServer.create({
      replSet: { count: 3 },
    } as any);
    this.uri = this.replset.getUri();

    const config = {
      dbName: 'test',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.db = await mongoose.connect(this.uri, config);
    this.db.set('debug', DEBUG);
    return this.db;
  }

  async close(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
}

export default MongoMemory;
