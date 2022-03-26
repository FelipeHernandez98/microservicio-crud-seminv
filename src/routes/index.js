const router = require('express').Router();
const libro = require('./libros');
const articulo = require('./articulos');

router.use('/art', articulo);
router.use('/lib', libro);

module.exports = router;