const express = require('express');
const router = express.Router();
const pool = require('../database');


router.post('/addArticulo', async(req, res)=>{
    
});

router.get('/articulos', async (req, res)=>{

    const libros = await pool.query('SELECT * FROM articulo');

    res.json({libros});
});

module.exports = router;