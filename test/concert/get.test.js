const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');
// const Day = require('../../models/day.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    // const testDay = new Day({ _id: '5d9f1140f10a81216cfd4408', number: 2 });
    // await testDay.save();

    const testConOne = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'TestPerformer', genre: 'TestGenre', price: 5, day: '5d9f1140f10a81216cfd4408', image: 'con.png' });
    await testConOne.save();

    const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee49', performer: 'TestPerformer2', genre: 'TestGenre', price: 5, day: '5d9f1140f10a81216cfd4408', image: 'con.png' });
    await testConTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
    // await Day.deleteMany();
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
});
