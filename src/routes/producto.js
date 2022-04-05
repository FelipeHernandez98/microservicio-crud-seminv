const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/productos', async (req, res)=>{

    try{
        const productos = await pool.query('SELECT * FROM producto');
        res.json(productos);
    }catch(e){
        res.json(e);
    }
});

router.post('/addProd', async (req, res)=>{
    const {
        nombre,
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    } = req.body;

    const newProd ={      
        nombre,
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    }
    console.log(newProd);
    await pool.query('INSERT INTO producto SET ?', [newProd]);
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
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    } = req.body;

    await pool.query('UPDATE producto SET nombre = ?, cantidad = ?, subcategoria = ?, fecha = ?, grupo = ?, programa = ?, facultad =?  WHERE id = ?', [nombre, cantidad, subcategoria, fecha, grupo, programa, facultad, id]);
    res.redirect('/prod/productos');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    const producto = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);

    if(producto == null){
        res.json(producto);
    }else{
        msg = 'El usuario no existe'
        res.json(msg);
    }
    
});


module.exports = router;
