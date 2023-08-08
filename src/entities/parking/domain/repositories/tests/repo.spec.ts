import { expect } from 'chai';

import MongoDB from '../../../../../core/mongodb';
import SQLDB from '../../../../../core/sqldb';
import { formatContact } from '../../../../../core/utils';

import Repository from '../Parking';
import { PARKING_TYPES } from '../../../application/constants';

describe('@Notifications/domain/repositories', () => {
  const mongodb = new MongoDB();
  const sqldb = new SQLDB();
  const parkingProps = {
    name: 'myGrateParking',
    spots: 50,
    contact: formatContact('+(52)3312-345678').contact,
    parkingType: PARKING_TYPES.public,
  };
  const parkingErrorProps = {
    name: 'myGrateParking',
    spots: 10,
    contact: '+(52)3312-345678',
    parkingType: 'default',
  };
  let newNoSQLParking;
  let newSQLParking;

  before(async () => {
    await mongodb.connect();
    await sqldb.connect();
  });

  after(async () => {
    await mongodb.close();
    await sqldb.close();
  });

  it('@ParkingRepo:Save: should create a new parking in NoSQL', async () => {
    const repository = new Repository();
    newNoSQLParking = await repository.save(parkingProps);

    expect(newNoSQLParking).to.have.property('_id');
    expect(newNoSQLParking).to.have.property('name');
    expect(newNoSQLParking).to.have.property('spots');
    expect(newNoSQLParking).to.have.property('contact');
    expect(newNoSQLParking).to.have.property('parkingType');

    expect(newNoSQLParking.name).to.be.equal(parkingProps.name);
    expect(newNoSQLParking.spots).to.be.equal(parkingProps.spots);
    expect(newNoSQLParking.contact).to.be.equal(parkingProps.contact);
    expect(newNoSQLParking.parkingType).to.be.equal(parkingProps.parkingType);
  });

  it('@ParkingRepo:Save: should create a new parking in SQL', async () => {
    const repository = new Repository('sql');
    newSQLParking = await repository.save(parkingProps);

    expect(newSQLParking).to.have.property('id');
    expect(newSQLParking).to.have.property('name');
    expect(newSQLParking).to.have.property('spots');
    expect(newSQLParking).to.have.property('contact');
    expect(newSQLParking).to.have.property('parkingType');

    expect(newSQLParking.name).to.be.equal(parkingProps.name);
    expect(newSQLParking.spots).to.be.equal(parkingProps.spots);
    expect(newSQLParking.contact).to.be.equal(parkingProps.contact);
    expect(newSQLParking.parkingType).to.be.equal(parkingProps.parkingType);
  });

  it('@ParkingRepo:ERROR: should get validation error from NoSQL', async () => {
    const repository = new Repository();
    try {
      // @ts-ignore
      const newParking = await repository.save(parkingErrorProps);
    } catch (error) {
      const { message } = error;
      const spotsError = message.includes('is less than minimum');
      const contactError = message.includes('Cast to Number failed');
      const parkingTypeError = message.includes('is not a valid enum value');

      expect(spotsError).to.be.true;
      expect(contactError).to.be.true;
      expect(parkingTypeError).to.be.true;
    }
  });

  it('@ParkingRepo:ERROR: should get validation error from SQL', async () => {
    const repository = new Repository('sql');
    try {
      // @ts-ignore
      const newParking = await repository.save(parkingErrorProps);
    } catch (error) {
      const { message } = error;
      const spotsError = message.includes('Validation min on spots failed');
      const parkingTypeError = message.includes(
        'Validation isIn on parkingType failed',
      );

      expect(spotsError).to.be.true;
      expect(parkingTypeError).to.be.true;
    }
  });

  it('@ParkingRepo:Update: should update a parking by id in NoSQL', async () => {
    const repository = new Repository();
    const target = newNoSQLParking._id.toString();
    const update = { spots: 300, contact: formatContact('1112345678').contact };
    const updatedParking = await repository.update(target, update);

    expect(updatedParking).to.have.property('_id');
    expect(updatedParking).to.have.property('spots');
    expect(updatedParking).to.have.property('contact');

    expect(updatedParking._id?.toString()).to.be.equal(target);
    expect(updatedParking.spots).to.be.equal(update.spots);
    expect(updatedParking.contact).to.be.equal(update.contact);
  });

  it('@ParkingRepo:Update: should update a parking by id in SQL', async () => {
    const repository = new Repository('sql');
    const target = newSQLParking.id;
    const update = { spots: 250, contact: formatContact('8812345678').contact };
    const updatedParking = await repository.update(target, update);

    expect(updatedParking).to.have.property('id');
    expect(updatedParking).to.have.property('spots');
    expect(updatedParking).to.have.property('contact');

    expect(updatedParking.id).to.be.equal(target);
    expect(updatedParking.spots).to.be.equal(update.spots);
    expect(updatedParking.contact).to.be.equal(update.contact);
  });

  it('@ParkingRepo:Paginate: should paginate parkings in NoSQL', async () => {
    const repository = new Repository();
    const query = { limit: 10, skip: 1, order: 'name' };
    const parkings = await repository.paginate(query);
    expect(parkings).to.have.property('totalItems');
    expect(parkings).to.have.property('data');
  });

  it('@ParkingRepo:Paginate: should paginate parkings in SQL', async () => {
    const repository = new Repository('sql');
    const query = { limit: 10, skip: 1, order: 'name' };
    const parkings = await repository.paginate(query);
    expect(parkings).to.have.property('totalItems');
    expect(parkings).to.have.property('data');
  });
});
