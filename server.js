const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const i = Math.floor(Math.random() * db.length);
  res.json(db[i]);
});

app.get('/testimonials/:id', (req, res) => {
  const item = db.find(item => item.id == req.params.id);
  if ( item ) res.json(item);
  else res.status(404).json({ message: 'Not found...' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
