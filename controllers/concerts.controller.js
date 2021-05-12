const Concert = require('../models/concert.model');
const Day = require('../models/day.model');
const Seat = require('../models/seat.model');
const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    const allConcerts = await Concert.find().populate('day');
    const allWorkshops = await Workshop.find();
    const displayConcerts = await Promise.all(allConcerts.map(async concert => {
      const bookedSeats = await Seat.countDocuments({day: concert.day._id});
      const workshops = allWorkshops.filter( ws => concert._id.equals(ws.concertId) );
      return {
        ...concert.toObject(),
        tickets: (50 - bookedSeats),
        workshops, 
      };
    }));

    res.json(displayConcerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id).populate('day');
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const performer = sanitize(req.body.performer),
    genre = sanitize(req.body.genre),
    price = sanitize(req.body.price),
    day = sanitize(req.body.day),
    image = sanitize(req.body.image);

  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      Object.assign(con, { performer, genre, price, day, image });
      const newCon = await con.save();
      res.json(newCon);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      await con.remove();
      res.json(con);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};
