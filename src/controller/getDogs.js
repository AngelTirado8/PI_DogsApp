// const axios = require('axios');
// const { Dog } = require('../db'); // Importa el modelo Dog

// async function getDogs( req, res)  {
//   try {
//     const response = await axios('https://api.thedogapi.com/v1/breeds/');
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener las razas de perros' });
//   }
// };

// module.exports = getDogs;



// const axios = require('axios');
// const { Dog, Temperament } = require('../db'); // Importa el modelo Dog

// async function getDogs(req, res) {
//   try {
//     // Obtener los perros de la API
//     const apiResponse = await axios('https://api.thedogapi.com/v1/breeds/');
//     const apiDogs = apiResponse.data;

//     // Obtener los perros de la base de datos
//     const dbDogs = await Dog.findAll({
//       include: {
//         model: Temperament,
//       attributes:["name"]
//         }
  
//     });

//     // Combinar los perros de la API y de la base de datos
//     const allDogs = [...apiDogs, ...dbDogs];
//     console.log(allDogs)
//     res.json(allDogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener las razas de perros' });
//   }
// }
// module.exports = getDogs;

const axios = require('axios');
const { Dog, Temperament } = require('../db'); // Importa el modelo Dog

async function getDogs(req, res) {
  try {
    // Obtener los perros de la API
    const apiResponse = await axios('https://api.thedogapi.com/v1/breeds/');
    const apiDogs = apiResponse.data;

    // Obtener los perros de la base de datos
    const dbDogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
      },
      attributes: ['weight', 'image'],
    });

    // Asignar la ruta de imagen de la carpeta de activos a los perros creados en la base de datos
    dbDogs.forEach((dog) => {
      if (dog.image.startsWith('http')){
        dog.imae = dog.image;
      }else{
        dog.image = '../../../api/assets/';
      }
      // dog.image = `../../../api/assets/imagenbd.jpeg${dog.image}`;
    });

    // Combinar los perros de la API y de la base de datos
    const allDogs = [...apiDogs, ...dbDogs];

    res.json(allDogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las razas de perros' });
  }
}

module.exports = getDogs;

