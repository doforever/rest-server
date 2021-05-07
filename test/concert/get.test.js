const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');
const Seat = require('../../models/seat.model');
const Day = require('../../models/day.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testDay = new Day({ number: 2 });
    const savedDay = await testDay.save();
    dayId = savedDay._id;

    const testSeat = new Seat({
      day: dayId,
      seat: 3,
      client: "Amanda Doe",
      email: "amandadoe@example.com"
    });
    await testSeat.save();

    const testConOne = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'TestPerformer',
      genre: 'TestGenre',
      price: 5,
      day: dayId,
      image: 'con.png'
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee49',
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
    await Seat.deleteMany();
    await Day.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.performer).to.be.equal('TestPerformer');
  });

  it('/ should return concerts with tickets property showing number of available tickets', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.body).to.be.an('array');
    for (concert of res.body) {
      expect(concert.tickets).to.be.a('number');
      expect(concert.tickets).to.be.equal(49);
    }
  });
});
