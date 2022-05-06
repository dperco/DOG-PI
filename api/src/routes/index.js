const { Router } = require('express');
const dogsRouter = require ('./dogs');
const tempermentRouter= require ('./temperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',dogsRouter);
router.use('/temperament',tempermentRouter);


module.exports = router;
 