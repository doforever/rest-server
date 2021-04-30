const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const t = await Testimonial.findOne().skip(rand);
    if (!t) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const t = await (Testimonial.findById(req.params.id));
    if (t) {
      Object.assign(t, {author, text});
      const newTestimonial = await t.save();
      res.json(newTestimonial);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const t = await (Testimonial.findById(req.params.id));
    if (t) {
      await t.remove();
      res.json(t);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};
