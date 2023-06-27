const { Dog, Temperament } = require('../db');
const axios = require('axios');

const apiKey = 'live_OybEDSSc02Io3KVbUErQQtUImGeIWgrABdVv763Roz5wag7xyRZjhuDkiRsiI1ec';
const url = 'https://api.thedogapi.com/v1/breeds/search?q=';

async function getDogsByName(req, res) {
    try {
        // const { name } = req.query;
        const name = req.query.name
        console.log({name})
        const apiResponse = await axios.get(`${url}${name}`);
        console.log(apiResponse.data)
        const apiDogs = apiResponse.data;


const dbDogs = await Dog.findAll({
    attributes: ['name'],
    include: {
    model: Temperament,
    attributes: [],
    },
});

const allDogs = [...apiDogs, ...dbDogs];

const filteredDogs = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

    if (filteredDogs.length > 0) {
        res.status(200).json(filteredDogs);
    } else {
        res.status(404).json({ message: 'Raza de perro no encontrada' });
        }   
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = getDogsByName;

