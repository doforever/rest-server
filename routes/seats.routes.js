const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  if (item) res.json(item);
  else res.status(404).json({ message: 'Not found...' });
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    if (db.seats.some(booking => booking.seat == seat && booking.day == day)){
      res.status(409).json({ message: "The slot is already taken..." });
    } else {
      const id = uuidv4();
      db.seats.push({ id, day, seat, client, email });
      res.status(201).json({ message: 'Created' });
    }
  }
  else res.status(400).json({ message: 'Bad request...' });
});

router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  const { day, seat, client, email } = req.body;

  if (item && day && seat && client && email) {
    Object.assign(item, { day, seat, client, email });
    res.json({ message: 'OK' });
  }
  else if (!item) res.status(404).json({ message: 'Not found...' });
  else res.status(400).json({ message: 'Bad request...' });
});

router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  if (item) {
    db.seats.splice(db.seats.indexOf(item), 1);
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Not found...' });
});

module.exports = router;
