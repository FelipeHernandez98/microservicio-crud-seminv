const express = require('express');
const router = express.Router();
const pool = require('../database');


router.post('/addLibro', async(req, res)=>{

    const { id_libro, 
        titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro } = req.body;

    newLibro = {
        id_libro, 
        titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro
    }

    await pool.query('INSERT INTO libro SET ?', [newLibro]);
    res.redirect('libros');
});

router.get('/libros', async (req, res)=>{

    const libros = await pool.query('SELECT * FROM libro');

    res.json({libros});
});

module.exports = router;