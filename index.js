const express = require('express');



const app = express();
const port = process.env.port || 4000;


app.set('port', port);
app.use(express.json());
app.use(express.urlencoded());
app.use(require('./src/routes'));


app.use('/libros', require('./src/routes/libros'));


app.listen(app.get('port'), ()=>{
    console.log('Microservicio CRUD en el puerto ', app.get('port'));
})