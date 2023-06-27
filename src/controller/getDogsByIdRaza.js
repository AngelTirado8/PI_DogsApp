const { Dog, Temperament } = require('../db');

async function getDogsFromDatabase(req, res) {
  try {
    const dogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    const dogData = dogs.map(dog => {
      const { id, name, image, temperaments } = dog;

      return {
        id,
        name,
        image,
        temperaments: temperaments.map(temperament => temperament.name),
      };
    });

    res.status(200).json(dogData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los perros de la base de datos' });
  }
}

module.exports = getDogsFromDatabase;


