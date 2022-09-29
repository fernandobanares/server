const express = require('express');

const app = express();

const frase = 'Hola mundo como están'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/frase', (req, res) => {
    res.send(frase)
})

app.get('/api/letras/:num', (req, res) => {
    const num = parseInt(req.params.num)

    if (isNaN(num)) {
        return res.send({ error: 'El parámetro ingresado no es un número'})
    }

    if (num < 1 || num > frase.length){
        return res.send({ error: 'El parámetro está fuera de rango'})
    }

    res.send(frase[num - 1])
})

app.get('/api/palabras/:num', (req, res) => {
    const num = parseInt(req.params.num)

    if (isNaN(num)){
        return res.send ({ error: 'El parámetro ingresado no es un número'})
    }

    const palabras = frase.split(' ')
    if (num < 1 || num > palabras.length){
        return res.send({ error: 'El parámetro está fuera de rango' })
    }

    res.send(palabras [num-1])
})

app.get ('/ruta', (req, res) => {
    let val = req.query.valor;
    let cod = req.query.codigo;
    let ind = req.query.indice;
    res.send(`El valor es ${val}, codigo: ${cod}, ind: ${ind}`)
})

app.post('/test', (req, res) => {
    let objeto = req.body;
    res.send(objeto)
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))