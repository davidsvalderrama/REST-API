const express = require('express');
const Joi = require('joi');
const router = express.Router();

const animals = require('../APIAnimals');

const schema = Joi.object({
  animalname: Joi.string().min(3),
  sexname: Joi.string().min(3),
});

router.get('/', (req, res) => {
  const { orderBy } = req.query;
  res.send({ animals, orderBy });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(animals.get(id));
});

router.post('/', (req, res) => {
  const {animalname, sexname} = req.body;
  const result = schema.validate({ animalname, sexname });
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const animal = animals.add(animalname, sexname);
  res.send(animal);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { animalname = '', sexname = '' } = req.body;
  const { animal, err } = animals.update(id, animalname, sexname);
  if (err) return next();
  res.send(animal);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const animal = animals.delete(id);
  res.send(animal);
});

module.exports = router;