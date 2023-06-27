const express = require('express');
const getDogs = require('../controller/getDogs.js');
const getDogByIdRaza = require('../controller/getDogsByIdRaza.js');
const getDogByName = require('../controller/getDogsByName.js');
const getTemperaments = require("../controller/getTemp.js")
const postDogs = require('../controller/postDogs.js');
// const getDogDataBase = require('../controller/getDogDataBase.js')
const router = express.Router();

// Middleware para las rutas de perros
const dogMiddleware = (req, res, next) => {
  // ... lógica del middleware de perros ...
  next(); // Llama a la siguiente función de middleware o ruta
};

// Ruta para los perros
router.get('/dogs', getDogs);
router.get('/dogs/name', getDogByName);
router.get('/dogs/:id', getDogByIdRaza);
router.get("/temperaments", getTemperaments);
router.post('/dogs', postDogs);
// router.get('/getDogDataBase', getDogDataBase);


module.exports = router;



