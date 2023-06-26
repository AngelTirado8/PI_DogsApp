const { Dog, Temperament } = require('../db');
const axios = require('axios');

const apiKey = 'live_OybEDSSc02Io3KVbUErQQtUImGeIWgrABdVv763Roz5wag7xyRZjhuDkiRsiI1ec';
const Url = 'https://api.thedogapi.com/v1/breeds/';

async function getDogByIdRaza(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(`${Url}${id}`, {
      headers: {
        'x-api-key': apiKey
      }
    });

    const { name, temperament, origin, life_span, weight, height, reference_image_id } = response.data;

    const dog = {
      name,
      temperament,
      origin,
      life_span,
      weight,
      height,
      reference_image_id
      
    };

    res.status(200).json(dog);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).send('No existe la raza de perro');
    } else {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el detalle de la raza de perro' });
    }
  }
}

module.exports = getDogByIdRaza;

