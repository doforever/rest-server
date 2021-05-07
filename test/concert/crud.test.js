const Concert = require('../../models/concert.model');
const Day = require('../../models/day.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Concert', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    let dayId;
    before(async () => {
      const testDay = new Day({ number: 2 });
      const savedDay = await testDay.save();
      dayId = savedDay._id;

      const testConOne = new Concert({
        performer: 'TestPerformer',
        genre: 'TestGenre',
        price: 5,
        day: dayId,
        image: 'con.png'
      });
      await testConOne.save();

      const testConTwo = new Concert({
        performer: 'TestPerformer2',
        genre: 'TestGenre',
        price: 5,
        day: dayId,
        image: 'con.png'
      });
      await testConTwo.save();
    });

    after(async () => {
      await Concert.deleteMany();
      await Day.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should contain day document after populate method', async () => {
      const concerts = await Concert.find().populate('day');
      for (con of concerts) {
        con.day.validate(err => {
          expect(err).to.not.exist;
        });
      }
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const expectedConcert = {
        performer: 'TestPerformer',
        genre: 'TestGenre',
        price: 5,
        day: dayId,
        image: 'con.png' };
      for (let key in expectedConcert) {
        const value = expectedConcert[key];
        const concert = await Concert.findOne({ [key]: value });
        expect(concert.performer).to.be.equal(expectedConcert.performer);
      }
    });
  });
});
