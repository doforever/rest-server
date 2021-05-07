const Concert = require('../../models/concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert model', () => {
  it('should throw an error if any arg is missing', () => {
    const cases = [
      {
        genre: 'Rock',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png'
      },
      {
        performer: 'John',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png'
      },
      {
        performer: 'John',
        genre: 'Rock',
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png'
      },
      {
        performer: 'John',
        genre: 'Rock',
        price: 20,
        image: 'con.png'
      },
      {
        performer: 'John',
        genre: 'Rock',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
      },
    ];

    for (let prop of cases) {
      const con = new Concert(prop);

      con.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "performer" is not a string', () => {

    const cases = [{}, []];
    for (let performer of cases) {
      const con = new Concert({
        performer,
        genre: 'Rock',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png',
      });

      con.validate(err => {
        expect(err.errors.performer).to.exist;
      });
    }
  });

  it('should throw an error if "genre" is not a string', () => {

    const cases = [{}, []];
    for (let genre of cases) {
      const con = new Concert({
        genre,
        performer: 'John',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png',
      });

      con.validate(err => {
        expect(err.errors.genre).to.exist;
      });
    }
  });

  it('should throw an error if "day" is not a string', () => {

    const cases = [{}, []];
    for (let day of cases) {
      const con = new Concert({
        day,
        performer: 'John',
        genre: 'Rock',
        price: 20,
        image: 'con.png'
      });

      con.validate(err => {
        expect(err.errors.day).to.exist;
      });
    }
  });

  it('should throw an error if "image" is not a string', () => {

    const cases = [{}, []];
    for (let image of cases) {
      const con = new Concert({
        image,
        performer: 'John',
        genre: 'Rock',
        price: 20,
        day: '5d9f1140f10a81216cfd4408',
      });

      con.validate(err => {
        expect(err.errors.image).to.exist;
      });
    }
  });

  it('should throw an error if "price" is not a number', () => {

    const cases = [{}, [], 'abc'];
    for (let price of cases) {
      const con = new Concert({
        price,
        performer: 'John',
        genre: 'Rock',
        day: '5d9f1140f10a81216cfd4408',
        image: 'con.png',
      });

      con.validate(err => {
        expect(err.errors.price).to.exist;
      });
    }
  });

  it('should not throw an error when properties are correct', () => {
    const con = new Concert({
      performer: 'John',
      genre: 'Rock',
      price: 20,
      day: '5d9f1140f10a81216cfd4408',
      image: 'con.png',
    });

    con.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
