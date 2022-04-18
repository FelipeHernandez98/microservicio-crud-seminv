const router = require('express').Router();
const libro = require('./libros');
const articulo = require('./articulos');
const producto = require('./producto');
const subcategoria = require('./subcategoria');

router.use('/art', articulo);
router.use('/lib', libro);
router.use('/prod', producto);
router.use('/sub', subcategoria);


module.exports = router;