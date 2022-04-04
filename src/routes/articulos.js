const express = require('express');
const router = express.Router();
const pool = require('../database');


router.post('/addArticulo', async(req, res)=>{

    const  {
            id_articulo,
            nombre_revista,
            titulo_articulo,
            autores_articulo,
            año_articulo,
            mes_articulo,
            volumen_articulo,
            pagina_inical,
            pagina_final,
            issn_articulo,
            url_articulo,
            doi_articulo        
            } = req.body;

    newArticulo ={
            id_articulo,
            nombre_revista,
            titulo_articulo,
            autores_articulo,
            año_articulo,
            mes_articulo,
            volumen_articulo,
            pagina_inical,
            pagina_final,
            issn_articulo,
            url_articulo,
            doi_articulo  
    }
    await pool.query('INSERT INTO articulo SET ?', [newArticulo]);
    res.redirect('articulos');
});

router.get('/articulos', async (req, res)=>{

    const articulos = await pool.query('SELECT * FROM articulo');
    res.json(articulos);
});

router.post('/editArt/:id_articulo', async(req, res)=>{
    const { id_articulo} = req.params;
    const {
            nombre_revista,
            titulo_articulo,
            autores_articulo,
            año_articulo,
            mes_articulo,
            volumen_articulo,
            pagina_inical,
            pagina_final,
            issn_articulo,
            url_articulo,
            doi_articulo    
    } = req.body;

    await pool.query('UPDATE articulo SET nombre_revista =?, titulo_articulo =?, autores_articulo =?, año_articulo =?, mes_articulo =?, volumen_articulo =?, pagina_inical =?, pagina_final =?, issn_articulo =?, url_articulo =?, doi_articulo =? WHERE id_articulo =?', 
    [   nombre_revista,
        titulo_articulo,
        autores_articulo,
        año_articulo,
        mes_articulo,
        volumen_articulo,
        pagina_inical,
        pagina_final,
        issn_articulo,
        url_articulo,
        doi_articulo,
        id_articulo]);

        res.redirect('/art/articulos'); 
});

router.get('/deleteArt/:id_articulo', async(req, res)=>{
    const { id_articulo } = req.params;
    await pool.query('DELETE FROM articulo WHERE id_articulo= ?', [id_articulo]);
    res.redirect('/art/articulos'); 
});

module.exports = router;