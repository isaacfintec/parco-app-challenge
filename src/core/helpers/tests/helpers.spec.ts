import { expect } from 'chai';

import { CustomError } from '../index';

describe('@Core/helpers', () => {
  it('@CustomError', () => {
    const message = '!Ups: test error';
    const type = 500;
    const customError = new CustomError(type, message);

    expect(customError.message).to.be.equal(message);
    expect(customError.code).to.be.equal(type);
  });
});
