const axios = require('axios');
const { Temperament } = require('../db');
// const { getTemperaments } = require('./getTemp');


async function getTemperaments (req, res)  {
  console.log("hola")
  try {
    const apiKey = process.env.API_KEY; // Obtener la clave de la API desde la variable de entorno
    const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const breeds = response.data;
    const arrayTemperament = [];

    breeds.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(',');
        breedTemperaments.forEach((temperament) => {
          const trimmedTemperament = temperament.trim();
          if (!arrayTemperament.includes(trimmedTemperament)) {
            arrayTemperament.push(trimmedTemperament);
          }
        });
      }
    });

    arrayTemperament.forEach(async (temperament) => {
      await Temperament.findOrCreate({
        where: { name: temperament }
      });
    });

    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getTemperaments;
