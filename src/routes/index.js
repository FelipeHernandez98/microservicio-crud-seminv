const router = require('express').Router();
const libro = require('./libros');
const articulo = require('./articulos');
const producto = require('./producto');

router.use('/art', articulo);
router.use('/lib', libro);
router.use('/prod', producto);


module.exports = router;