const { celebrate, Joi } = require('celebrate');
const express = require('express');
const app = express();

const PORT = 3000;

let nests = [
  {
    momma: 'swamp_princess',
    eggs: 40,
    temperature: 31
  },
  {
    momma: 'mrs.chompchomp',
    eggs: 37,
    temperature: 32.5
  }
];

const nestSchema = {
  body: {
    momma: Joi.string().required(),
    eggs: Joi.number().integer(),
    temperature: Joi.number()
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/nest', (req, res) => {
  res.json(nests);
});

app.post('/nest', celebrate(nestSchema), (req, res) => {
  const newNest = req.body;

  nests.push(newNest);
  res.json(nests);
});

app.use((error, req, res, next) => {
  if (error.joi) {
    return res.status(400).json({ error: error.joi.message });
  }

  return res.status(500).send(error);
});

app.listen(PORT, () => {
  console.log(`Swamp API listening on port ${PORT}`);
});
