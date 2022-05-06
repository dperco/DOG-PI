const { Dogs, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validar', () => {
    beforeEach(() => Dogs.sync({ force: true }));
    describe('New Dog', () => {
      it('should throw an error if name is null', (done) => {
        Dogs.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dogs.create({ name: 'Pepe' });
      });
      it('should throw an error if weight is null', (done) => {
        Dogs.create({
          name: "Ale",
          height: "[10-50]",
          weight: null,
        })
        .then(() => data(new Error('Requires a valid property (weight).')))
        .catch(() => done());
      });
      it('should work when its a valid weight', () => {
        Dogs.create({ weight: '[20-80]' });
      });
      it('should throw an error if height is null', (done) => {
        Dogs.create({
          name: "Ale",
          weight: "[20-80]",
          height: null,
        })
        .then(() => data(new Error('Requires a valid property (height).')))
        .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Dogs.create({ height: '[10-50]' });
      });
    });
  });
});

