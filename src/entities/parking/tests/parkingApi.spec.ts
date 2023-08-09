import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import MongoDB from '../../../core/mongodb';
import SQLDB from '../../../core/sqldb';
import Session from '../../user/application/useCases/Session';
import logger from 'morgan';

chai.use(chaiHttp);
const should = chai.should();

describe('@Parking/API', () => {
  const mongodb = new MongoDB();
  const sqldb = new SQLDB();
  let token: string;
  let parking;

  const parkingProps = {
    name: 'myNewParking',
    spots: 20,
    contact: '52331234568',
    parkingType: 'public',
  };

  before(async () => {
    const { session } = new Session().exec();
    token = session;
  });

  after(async () => {
    await mongodb.close();
    await sqldb.close();
  });

  it('@Parking:API:Private should get 401 error', async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/parking/')
      .send({ some: 'data' });

    response.should.have.status(401);
  });

  it('@Validation: should get validation error for spots, to small', async () => {
    const parkingPropsError = { ...parkingProps, spots: 20 };
    const response = await chai
      .request(app)
      .post('/api/v1/parking/')
      .set({ Authorization: `Token ${token}` })
      .send(parkingPropsError);

    response.should.have.status(400);
    const { errors } = response.body;
    const [spotsError] = errors;
    expect(spotsError.message.includes('The parking is very small')).to.be.true;
  });

  it('@Validation: should get validation error for spots, to big', async () => {
    const parkingPropsError = { ...parkingProps, spots: 2000 };
    const response = await chai
      .request(app)
      .post('/api/v1/parking/')
      .set({ Authorization: `Token ${token}` })
      .send(parkingPropsError);

    response.should.have.status(400);
    const { errors } = response.body;
    const [spotsError] = errors;
    expect(spotsError.message.includes('The parking lot is very big')).to.be
      .true;
  });

  it('@Create:POST: should create new parking', async () => {
    const parkingProps = {
      name: 'myNewParking',
      spots: 80,
      contact: '52331234568',
      parkingType: 'public',
    };

    const response = await chai
      .request(app)
      .post('/api/v1/parking/')
      .set({ Authorization: `Token ${token}` })
      .send(parkingProps);

    response.should.have.status(200);
    const { body } = response;
    expect(body).to.have.property('id');
    expect(body).to.have.property('name');
    expect(body).to.have.property('spots');
    expect(body).to.have.property('contact');
    expect(body).to.have.property('parkingType');

    expect(body.name).to.be.equal(parkingProps.name);
    expect(body.spots).to.be.equal(parkingProps.spots);
    expect(body.contact).to.be.equal(parkingProps.contact);
    expect(body.parkingType).to.be.equal(parkingProps.parkingType);
    parking = body;
  });

  it('@Create:POST: should create spam', async () => {
    const parkingProps = {
      name: 'AnotherParking',
      spots: 50,
      contact: '52331234568',
      parkingType: 'courtesy',
    };

    const response = await chai
      .request(app)
      .post('/api/v1/parking/')
      .set({ Authorization: `Token ${token}` })
      .send(parkingProps);
    response.should.have.status(200);
  });

  it('@Update:PUT: should update existing parking', async () => {
    const parkingProps = { spots: 777, contact: '9987654321' };

    const response = await chai
      .request(app)
      .put(`/api/v1/parking/${parking.id}/update`)
      .set({ Authorization: `Token ${token}` })
      .send(parkingProps);

    response.should.have.status(200);
    const { body } = response;
    expect(body).to.have.property('id');
    expect(body).to.have.property('spots');
    expect(body).to.have.property('contact');

    expect(body.id).to.be.equal(parking.id);
    expect(body.spots).to.be.equal(parkingProps.spots);
    expect(body.contact).to.be.equal(+parkingProps.contact);
  });

  it('@Update:PUT:Error should get error injection', async () => {
    const parkingProps = {
      spots: 777,
      contact: '9987654321',
      name: 'otherName',
      parkingType: 'private',
    };

    const response = await chai
      .request(app)
      .put(`/api/v1/parking/${parking.id}/update`)
      .set({ Authorization: `Token ${token}` })
      .send(parkingProps);

    response.should.have.status(400);
  });

  it('@Paginate:GET: should get a pagination', async () => {
    const response = await chai
      .request(app)
      .get(`/api/v1/parking/paginate?limit=5&order=spots&sort=desc&skip=1`)
      .set({ Authorization: `Token ${token}` });

    response.should.have.status(200);
    const { body } = response;
    expect(body).to.have.property('totalItems');
    expect(body).to.have.property('data');
    expect(Array.isArray(body.data)).to.be.true;
    expect(body.data.length > 0).to.be.true;
    let validSort = true;
    body.data.reduce((acc, v) => {
      const { spots: a } = acc;
      const { spots: b } = v;
      if (a < b) validSort = false;
      return v;
    });
    expect(validSort).to.be.true;
  });
});
