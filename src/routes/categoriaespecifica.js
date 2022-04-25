const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/categoriasespecifica', async (req, res)=>{

    try{
        const categoria = await pool.query('SELECT * FROM categoria_especifica');
        res.json(categoria);
    }catch(e){
        res.json(e);
    }
});

router.post('/addCategoriaEsp', async (req, res)=>{
    const {
        descripcion,
        categoria_general
    } = req.body;

    const newCat ={      
        descripcion,
        categoria_general
    }
    await pool.query('INSERT INTO categoria_especifica SET ?', [newCat]);
    res.redirect('categoriasespecifica');
});

router.get('/deleteCatEsp/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM categoria_especifica WHERE id = ?', [id]);
    res.redirect('/catEsp/categoriasespecifica');
});

router.post('/editCatEsp/:id', async(req, res)=>{
    const {id} = req.params;
    const {
        descripcion,
        categoria_general
    } = req.body;

    await pool.query('UPDATE categoria_especifica SET descripcion = ?, categoria_general = ?  WHERE id = ?', [descripcion, categoria_general, id]);
    res.redirect('/catEsp/categoriasespecifica');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let categoria = await pool.query('SELECT * FROM categoria_especifica WHERE id = ?', [id]);

    categoria = categoria[0];
    
    if(categoria != null){
        res.json(categoria);
    }else{
        msg = 'La categoria no existe'
        res.json(msg);
    }
    
});

router.post('/addMasivaCatEsp', async(req, res)=>{
    const lista = req.body;
    var i = 0;
    try {
        while(i < lista.length){
            const newCat = {
                descripcion : lista[i].descripcion,
                categoria_general : lista[i].categoria_general
            }
            await pool.query('INSERT INTO categoria_especifica SET ?', [newCat]);
            i++;
        }
        res.redirect('categoriasespecifica');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
