const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/productos', async (req, res)=>{
    const productos = await pool.query('SELECT * FROM producto');
    res.json(productos);
});

router.post('/addProd', async (req, res)=>{
    const {
        id,
        nombre,
        cantidad
    } = req.body;

    const newProd ={
        id,
        nombre,
        cantidad
    }
    await pool.query('INSERT INTO set ?', [newProd]);
    res.redirect('productos');
});

router.get('/deleteProd/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM producto WHERE id = ?', [id]);
    res.redirect('/prod/productos');
});

router.post('/editProd/:id', async(req, res)=>{
    const {id} = req.params;
    const {
        nombre,
        cantidad
    } = req.body;

    await pool.query('UPDATE producto SET nombre = ?, cantidad = ? WHERE id_producto = ?', [nombre, cantidad, id]);
    res.redirect('/prod/productos');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    const producto = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);
    res.json(producto);
});


module.exports = router;
