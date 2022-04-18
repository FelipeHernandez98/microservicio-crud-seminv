const router = require('express').Router();
const libro = require('./libros');
const articulo = require('./articulos');
const producto = require('./producto');
const subcategoria = require('./subcategoria');
const categoria = require('./categoriageneral');

router.use('/art', articulo);
router.use('/lib', libro);
router.use('/prod', producto);
router.use('/sub', subcategoria);
router.use('/cat', categoria);


module.exports = router;