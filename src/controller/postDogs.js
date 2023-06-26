const express = require('express');
const { Dog, Temperament } = require('../db');

const router = express.Router();

async function postDogs (req, res)  {
  console.log(req.body)
  let {
    name,
    image,
    height,
    weight,
    life_span,
    temperaments,
  } = req.body;

  try {
    let dogCreated = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
      temperaments,
    });

    let temperamentDb = await Temperament.findAll({
      where: { name: temperaments }
    });

    await dogCreated.addTemperament(temperamentDb);

    res.send('Dog created 🐶');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = postDogs;