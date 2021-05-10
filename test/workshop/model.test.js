const Workshop = require('../../models/workshop.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop model', () => {
  it('should throw an error if any arg is missing', () => {
    const cases = [{ name: 'Rock' }, { concertId: '5d9f1140f10a81216cfd4408' }];

    for (let prop of cases) {
      const ws = new Workshop(prop);

      ws.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for (let name of cases) {
      const ws = new Workshop({
        name,
        concertId: '5d9f1140f10a81216cfd4408',
      });

      ws.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "concertId" is not a string', () => {

    const cases = [{}, []];
    for (let concertId of cases) {
      const ws = new Workshop({
        concertId,
        name: 'John',
      });

      ws.validate(err => {
        expect(err.errors.concertId).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const ws = new Workshop({
      name: 'John',
      concertId: '5d9f1140f10a81216cfd4408',
    });

    ws.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
