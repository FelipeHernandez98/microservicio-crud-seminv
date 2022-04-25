const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/subcategorias', async (req, res)=>{

    try{
        const subcategorias = await pool.query('SELECT * FROM subcategoria_producto');
        res.json(subcategorias);
    }catch(e){
        res.json(e);
    }
});

router.post('/addSubCategoria', async (req, res)=>{
    const {
        descripcion,
        categoria_especifica,
    } = req.body;

    const newSub ={      
        descripcion,
        categoria_especifica,
    }
    console.log(newProd);
    await pool.query('INSERT INTO subcategoria_producto SET ?', [newSub]);
    res.redirect('subcategorias');
});

router.get('/deleteSub/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM subcategoria_producto WHERE id = ?', [id]);
    res.redirect('/sub/subcategorias');
});

router.post('/editSub/:id', async(req, res)=>{
    const {id} = req.params;
    const {
        descripcion,
        categoria_especifica,
    } = req.body;

    await pool.query('UPDATE subcategoria_producto SET descripcion = ?, categoria_especifica = ?  WHERE id = ?', [descripcion, categoria_especifica, id]);
    res.redirect('/sub/subcategorias');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let subcategoria = await pool.query('SELECT * FROM subcategoria_producto WHERE id = ?', [id]);

    subcategoria = subcategoria[0];
    
    if(subcategoria != null){
        res.json(subcategoria);
    }else{
        msg = 'La subcategoria no existe'
        res.json(msg);
    }
    
});

router.post('/addMasivaSub', async(req, res)=>{
    const lista = req.body;
    var i = 0;
    try {
        while(i<lista.length){
            const newSub = {
                descripcion: lista[i].descripcion,
                categoria_especifica: lista[i].categoria_especifica
            }
            await pool.query('INSERT INTO subcategoria_producto SET ?', [newSub]);
            i++;
        }
        res.redirect('subcategorias');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
