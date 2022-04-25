const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/categoriasgeneral', async (req, res)=>{

    try{
        const categoria = await pool.query('SELECT * FROM categoria_general');
        res.json(categoria);
    }catch(e){
        res.json(e);
    }
});

router.post('/addCategoria', async (req, res)=>{
    const {
        descripcion
    } = req.body;

    const newCat ={      
        descripcion
    }
    await pool.query('INSERT INTO categoria_general SET ?', [newCat]);
    res.redirect('categoriasgeneral');
});

router.get('/deleteCat/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM categoria_general WHERE id = ?', [id]);
    res.redirect('/cat/categoriasgeneral');
});

router.post('/editCat/:id', async(req, res)=>{
    const {id} = req.params;
    const {
        descripcion
    } = req.body;

    await pool.query('UPDATE categoria_general SET descripcion = ?  WHERE id = ?', [descripcion, id]);
    res.redirect('/cat/categoriasgeneral');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let categoria = await pool.query('SELECT * FROM categoria_general WHERE id = ?', [id]);

    categoria = categoria[0];
    
    if(categoria != null){
        res.json(categoria);
    }else{
        msg = 'La categoria no existe'
        res.json(msg);
    }
    
});

router.post('/addMasivaCat', async(req, res)=>{
    const lista = req.body;
    var i=0;
    try {
        while(i<lista.length){
            const newCat ={
                descripcion: lista[i].descripcion
            }
            await pool.query('INSERT INTO categoria_general SET ?', [newCat]);
            i++;
        }
        res.redirect('categoriasgeneral');
    } catch (error) {
        console.log(error);
    }
    
});



module.exports = router;
